using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Requests;
using Sabio.Models.Requests.ExternalLinks;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain.ExternalLinks;
using System.Data;
using Sabio.Services.Interfaces;
using System.Reflection;
using Sabio.Models.Domain.Blogs;
using Sabio.Data;

namespace Sabio.Services
{
    public class ExternalLinksService : IExternalLinkService 
    {

        private static IDataProvider _dataProvider = null;
        ILookUpService _lookUpService = null;
        IBaseUserMapper _userMapper = null;
        public ExternalLinksService(IDataProvider dataProvider, ILookUpService lookUpService, IBaseUserMapper userMapper)
        {
            _lookUpService = lookUpService;
            _dataProvider = dataProvider;
            _userMapper = userMapper;
        }

        public int Create(ExternalLinkAddRequest request, int userId)
        {

            int id = 0;
            string procName = "[dbo].[ExternalLinks_InsertV2]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(request, collection);
                    collection.AddWithValue("@UserId", userId);

                    SqlParameter idOut = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                    idOut.Direction = System.Data.ParameterDirection.Output;

                    collection.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;

                    int.TryParse(oId.ToString(), out id);
                });
            return id;
        }
        public void Update(ExternalLinkUpdateRequest request)
        {
            string procName = "[dbo].[ExternalLinks_UpdateV2]";
            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(request, col);
                col.AddWithValue("@Id", request.Id);
               
                
            }, returnParameters: null);

        }
        public void Delete(int id)
        {
            string procName = "[dbo].[ExternalLinks_DeleteById]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", id);
                },
                returnParameters: null
                );
        }
        public Paged<ExternalLink> ExternalLinksSelectByCreatedBy(int pageIndex, int pageSize, int userId)
        {
            string procName = "[dbo].[ExternalLinks_Select_ByCreatedByV2]";
            Paged<ExternalLink> pagedList = null;
            List<ExternalLink> list = null;
            int totalCount = 0;
            _dataProvider.ExecuteCmd(procName,
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@CreatedBy", userId);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    ExternalLink externalLink = MapExternalLinks(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<ExternalLink>();
                    }
                    list.Add(externalLink);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<ExternalLink>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public ExternalLink MapExternalLinks(IDataReader reader, ref int startingIndex)
        { 
            ExternalLink externalLink = new ExternalLink();
            externalLink.Id = reader.GetSafeInt32(startingIndex++);
            externalLink.User = _userMapper.MapUser(reader, ref startingIndex);
            externalLink.UrlType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            externalLink.Url = reader.GetSafeString(startingIndex++);
            externalLink.EntityId = reader.GetSafeInt32(startingIndex++);
            externalLink.EntityType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            externalLink.DateCreated = reader.GetSafeDateTime(startingIndex++);
            externalLink.DateModified = reader.GetSafeDateTime(startingIndex++);
            return externalLink;
        }


        private static void AddCommonParams(ExternalLinkAddRequest request, SqlParameterCollection col)
        {
          
            col.AddWithValue("@UrlTypeId", request.UrlTypeId);
            col.AddWithValue("@Url", request.Url);
            col.AddWithValue("@EntityId", request.EntityId);
            col.AddWithValue("@EntityTypeId", request.EntityTypeId);
        }
    }
}


