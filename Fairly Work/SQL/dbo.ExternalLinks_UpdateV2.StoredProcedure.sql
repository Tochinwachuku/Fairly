USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[ExternalLinks_UpdateV2]    Script Date: 6/13/2023 7:14:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: <Tochi Nwachuku>
-- Create date: <05/8/2023>
-- Description: <Update a External links record>
-- Code Reviewer: Andy Chipres

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[ExternalLinks_UpdateV2]
					@Id int
					--@UserId int
					,@UrlTypeId int
					,@Url nvarchar(255)
					,@EntityId int
					,@EntityTypeId int

as

/*

Declare @Id int = 67
	
		,@UrlTypeId int = 1
		,@Url nvarchar(255)= 'wwww.testing.com/home'
		,@EntityId int = 0
		,@EntityTypeId int = 1

Execute [dbo].[ExternalLinks_UpdateV2]
					@Id 
					,@UrlTypeId 
					,@Url 
					,@EntityId 
					,@EntityTypeId 

Select *
From dbo.ExternalLinks

*/


BEGIN

declare @datenow datetime2 = getutcdate()

UPDATE [dbo].[ExternalLinks]
   SET 
		--[UserId] = @UserId
      [UrlTypeId] = @UrlTypeId
      ,[Url] = @Url
      ,[EntityId] = CASE WHEN @EntityId = 0 THEN NULL ELSE @EntityId END
      ,[EntityTypeId] = CASE WHEN @EntityTypeId = 0 THEN NULL ELSE @EntityTypeId END
      ,[DateModified] = @datenow
 WHERE Id = @Id

 END

GO
