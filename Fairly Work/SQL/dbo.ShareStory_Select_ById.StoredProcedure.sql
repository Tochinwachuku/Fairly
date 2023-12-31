USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[ShareStory_Select_ById]    Script Date: 5/31/2023 5:29:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Juan Sotelo
-- Create date: 5/10/23
-- Description: ShareStory_Select_ById Proc
-- Code Reviewer: Rob Currin

-- MODIFIED BY: Tochi Nwachuku
-- MODIFIED DATE: 5/31/23
-- Code Reviewer: Lawrence Caballes
-- Note: Added a Primary Image Url Coloumn
-- =============================================


CREATE PROC [dbo].[ShareStory_Select_ById]
				@Id int


AS

/*

	DECLARE @Id int = 24

	EXECUTE [dbo].[ShareStory_Select_ById] @Id

SELECT *
FROM dbo.ShareStory

*/


BEGIN

	SELECT ss.[Id]
			,ss.[Name]
			,ss.[Email]
			,ss.[PrimaryImageUrl]
			,ss.[Story]
			,ss.[CreatedBy]
			,u.[FirstName]
			,u.[LastName]
			,u.[Mi]
			,u.[AvatarUrl] as Avatar
			,ss.IsApproved
			,ss.[ApprovedBy]
			,u2.[FirstName]
			,u2.[LastName]
			,u2.[Mi]
			,u2.[AvatarUrl] as Avatar
			,ss.[DateCreated]
			,ss.[DateModified]





	FROM[dbo].[ShareStory] as ss 
	inner join [dbo].[Users] as u
	on ss.CreatedBy = u.Id  
	
	
	left outer join [dbo].[Users] as u2
	on ss.ApprovedBy = u2.Id


	WHERE ss.[Id] = @Id

END
GO
