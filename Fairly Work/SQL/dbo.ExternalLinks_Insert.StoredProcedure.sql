USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[ExternalLinks_Insert]    Script Date: 6/9/2023 7:27:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: <Tochi Nwachuku>
-- Create date: <05/8/2023>
-- Description: <Create a ExternalLinks record>
-- Code Reviewer: Andy Chipres

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[ExternalLinks_Insert]
					@UserId int
					,@UrlTypeId int
					,@Url nvarchar(255)
					,@EntityId int
					,@EntityTypeId int
					,@Id int OUTPUT
					
as

/*

Declare 
		@UserId int = 11
		,@UrlTypeId int= 3
		,@Url nvarchar(255)= 'test.com'
		,@EntityId int= 2
		,@EntityTypeId int= 2
		,@Id int = 0

Execute [dbo].[ExternalLinks_Insert]
					@UserId 
					,@UrlTypeId 
					,@Url 
					,@EntityId 
					,@EntityTypeId 
					,@Id = @Id OUTPUT


Select *
from dbo.externalLinks

select *
from dbo.Urltypes

Select *
from dbo.users
				
*/


BEGIN

INSERT INTO [dbo].[ExternalLinks]
           ([UserId]
      ,[UrlTypeId]
      ,[Url]
      ,[EntityId]
      ,[EntityTypeId]  )
     VALUES
           (
					@UserId 
					,@UrlTypeId 
					,@Url 
					,@EntityId 
					,@EntityTypeId  
			)
			Set @Id = SCOPE_IDENTITY();

END
GO
