USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[ExternalLinks_Update]    Script Date: 6/9/2023 7:27:26 PM ******/
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

CREATE proc [dbo].[ExternalLinks_Update]
					@Id int OUTPUT
					,@UserId int
					,@UrlTypeId int
					,@Url nvarchar(255)
					,@EntityId int
					,@EntityTypeId int

as

/*

Declare @Id int = 0
		,@UserId int = 3
		,@UrlTypeId int = 1 
		,@Url nvarchar(255)= 'test.com'
		,@EntityId int = 1
		,@EntityTypeId int = 1

Execute [dbo].[ExternalLinks_Update]
					@Id OUTPUT
					,@UserId 
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
   SET [UserId] = @UserId
      ,[UrlTypeId] = @UrlTypeId
      ,[Url] = @Url
      ,[EntityId] = @EntityId
      ,[EntityTypeId] = @EntityTypeId
	  ,[DateCreated] =  @datenow 
      ,[DateModified] = @datenow
 WHERE Id = @Id

 END

GO
