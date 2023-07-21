USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[ExternalLinks_DeleteById]    Script Date: 5/11/2023 5:17:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:	Nwachuku,Tochi
-- Create date: 05/8/2023
-- Description: [dbo].[ExternalLinks_DeleteById]
-- Code Reviewer:  Andy Chipres

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROCEDURE [dbo].[ExternalLinks_DeleteById]
		@Id int

AS

/**-----Test Code----


Declare @Id int = 10
Execute dbo.ExternalLinks_DeleteById @Id

select *
From dbo.externallinks


*/
BEGIN
  
    DELETE FROM [dbo].[ExternalLinks]
    WHERE Id = @Id;

END
GO
