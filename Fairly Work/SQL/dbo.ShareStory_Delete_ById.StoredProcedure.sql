USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[ShareStory_Delete_ById]    Script Date: 5/10/2023 4:48:45 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[ShareStory_Delete_ById]
			@Id int

AS


/*

	DECLARE @Id int = 22

	EXECUTE [dbo].[ShareStory_Delete_ById]
			@Id 

	SELECT *
	FROM dbo.ShareStory

*/


BEGIN 

		DELETE FROM [dbo].[ShareStory]
			WHERE Id = @Id 

END
GO
