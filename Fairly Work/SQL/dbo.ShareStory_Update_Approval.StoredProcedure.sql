USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[ShareStory_Update_Approval]    Script Date: 5/10/2023 4:48:45 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROC [dbo].[ShareStory_Update_Approval]
					@Id int
					,@IsApproved bit

AS

/*

	DECLARE @Id int = 22
	
	DECLARE @IsApproved bit = 1

	

	EXECUTE [dbo].[ShareStory_Update_Approval] 
					@Id
					,@IsApproved

	EXECUTE dbo.ShareStory_Select_ById @Id
			
	


SELECT *
FROM dbo.ShareStory



*/

BEGIN 
	
	Declare @DateNow datetime2(7) = GETUTCDATE();

	UPDATE [dbo].[ShareStory]
	
	SET	[DateModified] = @DateNow
		,[IsApproved] = @IsApproved
		
		

WHERE Id = @Id	

END
GO
