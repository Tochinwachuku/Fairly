USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[ShareStory_Update]    Script Date: 5/31/2023 5:29:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Juan Sotelo
-- Create date: 5/10/23
-- Description: ShareStory_Update Proc
-- Code Reviewer: Rob Currin

-- MODIFIED BY: Tochi Nwachuku
-- MODIFIED DATE: 5/31/23
-- Code Reviewer: Lawrence Caballes
-- Note: Added a Primary Image Url Coloumn
-- =============================================


CREATE PROC [dbo].[ShareStory_Update]

		@Name nvarchar(50)
		,@Email nvarchar(50)
		,@PrimaryImageUrl nvarchar(200)
		,@Story nvarchar(3000)
		,@CreatedBy int
		,@Id int

AS
/*

	

	DECLARE @Id int = 6
			,@Name nvarchar(50) = 'updated name22'
			,@Email nvarchar(50) = 'update email22'
			,@PrimaryImageUrl nvarchar(200) = 'NULL'
			,@Story nvarchar(3000) = 'story update22'
			,@CreatedBy int = 8
			
	EXECUTE [dbo].[ShareStory_Update] 
			@Name
			,@Email
			,@PrimaryImageUrl 
			,@Story 
			,@CreatedBy
			,@Id       


SELECT *
FROM dbo.ShareStory

SELECT *
FROM dbo.Users

*/

BEGIN 
	
	Declare @DateNow datetime2(7) = GETUTCDATE();
	
	UPDATE [dbo].[ShareStory]
	
	SET [Name] = @Name
		,[Email]  = @Email
		,[PrimaryImageUrl] = @PrimaryImageUrl 
		,[Story] = @Story
		,[DateModified] = @DateNow

WHERE Id = @Id AND CreatedBy = @CreatedBy

END
GO
