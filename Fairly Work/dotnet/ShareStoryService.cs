using Sabio.Data.Providers;
using Sabio.Models.Requests.ShareStorys;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Sabio.Services.Interfaces;
using Sabio.Models.Domain.ShareStorys;
using Sabio.Models;
using Sabio.Data;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Jobs;

namespace Sabio.Services
{

    public class ShareStoryService : IShareStoryService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;
        IBaseUserMapper _baseUserMapper = null;

        public ShareStoryService(IDataProvider data, ILookUpService lookUpService, IBaseUserMapper mapper)
        {
            _data = data;
            _lookUpService = lookUpService;
            _baseUserMapper = mapper;
        }

        public int AddShareStory(ShareStoryAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[ShareStory_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    ShareStoryParams(model, collection, userId);
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    collection.Add(idOut);
                }
                , returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    Int32.TryParse(oId.ToString(), out id);
                });
            return id;

        }
        
        public ShareStory GetById(int id)
        {
            string procName = "[dbo].[ShareStory_Select_ById]";
            ShareStory aStory = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection collection)

            {
                collection.AddWithValue("@Id", id);

            }
            , delegate (IDataReader reader, short set)
            {
                int index = 0;

                aStory = MapSingleShareStory(reader, ref index);
            }
            );
            return aStory;
        }

        public Paged<ShareStory> GetShareStoryByNotApproved(int pageIndex, int pageSize, bool isApproved)
        {
            Paged<ShareStory> pagedList = null;
            List<ShareStory> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[ShareStory_SelectAll]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@IsApproved", isApproved);
                },
                (reader, recordeSetIndex) =>
                {
                    int startIndex = 0;
                    ShareStory aStory = MapSingleShareStory(reader, ref startIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<ShareStory>();
                    }
                    list.Add(aStory);
                }
            );
            if (list != null)
            {
                pagedList = new Paged<ShareStory>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public void Update(ShareStoryUpdate model, int userId)
        {
            string procName = "[dbo].[ShareStory_Update]";
            _data.ExecuteNonQuery(procName,
               inputParamMapper: delegate (SqlParameterCollection collection)
               {
                   ShareStoryParams(model, collection, userId);
                   collection.AddWithValue("@Id", model.Id);


               },
               returnParameters: null);
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[ShareStory_Delete_ById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Id", id);
            },
        returnParameters: null);
        }
        
        public void UpdateApproval(int id, bool isApproved, int userId)
        {
            string procName = "[ShareStory_Update_Approval]";
            _data.ExecuteNonQuery(procName,
               inputParamMapper: delegate (SqlParameterCollection collection)
               {

                   collection.AddWithValue("@Id", id);
                   collection.AddWithValue("@IsApproved", isApproved);
                   collection.AddWithValue("@ApprovedBy", userId);

               },
               returnParameters: null);
        }

        public ShareStory MapSingleShareStory(IDataReader reader, ref int startingIndex)
        {
            ShareStory aStory = new ShareStory();


            aStory.Id = reader.GetSafeInt32(startingIndex++);
            aStory.Name = reader.GetSafeString(startingIndex++);
            aStory.Email = reader.GetSafeString(startingIndex++);
            aStory.PrimaryImageUrl = reader.GetSafeString(startingIndex++);
            aStory.Story = reader.GetSafeString(startingIndex++);
            aStory.Author = _baseUserMapper.MapUser(reader, ref startingIndex);
            aStory.IsApproved = reader.GetSafeBool(startingIndex++);
            aStory.ApprovedBy = _baseUserMapper.MapUser(reader, ref startingIndex);
            aStory.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aStory.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aStory;

        }
        
        public static void ShareStoryParams(ShareStoryAddRequest model, SqlParameterCollection collection, int userId)
        {
            collection.AddWithValue("@Name", model.Name);
            collection.AddWithValue("@Email", model.Email);
            collection.AddWithValue("@Story", model.Story);
            collection.AddWithValue("@PrimaryImageUrl", model.PrimaryImageUrl);
            collection.AddWithValue("@CreatedBy", userId);
        }
    }
}
