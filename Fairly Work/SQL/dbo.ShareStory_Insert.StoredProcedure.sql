USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[ShareStory_Insert]    Script Date: 5/31/2023 5:29:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Juan Sotelo
-- Create date: 5/10/23
-- Description: ShareStory_Insert Proc
-- Code Reviewer: Rob Currin

-- MODIFIED BY: Tochi Nwachuku
-- MODIFIED DATE: 5/31/23
-- Code Reviewer: Lawrence Caballes
-- Note: Added a Primary Image Url Coloumn
-- =============================================


CREATE proc [dbo].[ShareStory_Insert]
				@Name nvarchar(50)
				,@Email nvarchar(50)
				,@PrimaryImageUrl nvarchar(200)
				,@Story nvarchar (3000)
				,@CreatedBy int 
				,@Id int OUTPUT 





AS

/*

	DECLARE @Id int = 0;

	DECLARE 
			@Name nvarchar(50) = 'Story 1'
			,@Email nvarchar(50) = 'story@Email2.com'
			,@PrimaryImageUrl nvarchar(200)= 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg'
			,@Story nvarchar(3000) = 'Test Story2'
			,@CreatedBy int = 8
			
	
	EXECUTE dbo.ShareStory_Insert
			@Name 
			,@Email
			,@PrimaryImageUrl
			,@Story
			,@CreatedBy
			,@Id OUTPUT 

SELECT *
FROM dbo.ShareStory

SELECT *
FROM dbo.Users



*/



BEGIN 

	INSERT INTO [dbo].[ShareStory]
			([Name]
			,[Email]
			,[PrimaryImageUrl]
			,[Story]
			,[CreatedBy])
	VALUES
			(@Name
			,@Email
			,@PrimaryImageUrl 
			,@Story
			,@CreatedBy)

SET @Id = SCOPE_IDENTITY()


	

END
GO
