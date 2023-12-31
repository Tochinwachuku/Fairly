USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[ExternalLinks_Select_ByCreatedBy]    Script Date: 5/11/2023 5:17:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: <Tochi Nwachuku>
-- Create date: <05/8/2023>
-- Description: <Select paginated External Links by CreatedBy>
-- Code Reviewer: Andy Chipres

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[ExternalLinks_Select_ByCreatedBy]
					@PageIndex int 
					,@PageSize int
					,@CreatedBy int 
						

as

/*
Declare @PageIndex int = 0
				,@PageSize int = 10
				,@CreatedBy int = 11
Execute [dbo].[ExternalLinks_Select_ByCreatedBy]
				@PageIndex 
				,@PageSize
				,@CreatedBy 
Select *
from dbo.externalLinks

select *
from dbo.Urltypes

Select *
from dbo.users
*/


BEGIN

Declare @offSet int = @PageIndex * @PageSize 

SELECT e.[Id]
      ,e.[UserId]
	  ,t.[Name]
	  ,t.[Id]
	  ,e.[UrlTypeId]
	  ,e.[Url]
	  ,e.[EntityId]
	  ,e.[EntityTypeId]
      ,e.[DateCreated]
      ,e.[DateModified]
	  ,TotalCount = COUNT(1) OVER()
  FROM [dbo].[ExternalLinks] as e inner join dbo.UrlTypes as t
						on e.UrlTypeId = t.Id
								inner join dbo.Users as u 
						on e.UserId = u.Id
	Where u.Id = @CreatedBy
	Order by e.Id
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY
	
END
GO
