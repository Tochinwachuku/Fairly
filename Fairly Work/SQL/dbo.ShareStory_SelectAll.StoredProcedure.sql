USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[ShareStory_SelectAll]    Script Date: 5/31/2023 5:29:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Juan Sotelo
-- Create date: 5/10/23
-- Description: ShareStory_SelectAll Proc
-- Code Reviewer: Rob Currin

-- MODIFIED BY: Tochi Nwachuku
-- MODIFIED DATE: 5/31/23
-- Code Reviewer: Lawrence Caballes
-- Note:
-- =============================================



CREATE PROC [dbo].[ShareStory_SelectAll]

@IsApproved bit 
,@PageIndex int
,@PageSize int




AS

/*

	DECLARE @IsApproved int = 0
			,@PageIndex int = 0
			,@PageSize int = 5
			
	EXECUTE [dbo].[ShareStory_SelectAll]
			@IsApproved  
			,@PageIndex
			,@PageSize



*/


BEGIN

	DECLARE @offset int = @PageIndex * @PageSize 

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
			,TotalCount = COUNT(1) OVER()

	FROM[dbo].[ShareStory] as ss 
	inner join [dbo].[Users] as u
	on ss.CreatedBy = u.Id  
	
	
	inner join [dbo].[Users] as u2
	on ss.ApprovedBy = u2.Id
	
	WHERE IsApproved = @IsApproved

	ORDER BY Id
	OFFSET @offset ROWS
	FETCH NEXT @PageSize ROWS ONLY


	

END
GO
