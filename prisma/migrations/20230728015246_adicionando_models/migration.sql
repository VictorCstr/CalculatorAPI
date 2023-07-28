BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[produtor] (
    [id] NVARCHAR(1000) NOT NULL,
    [nome] NVARCHAR(1000) NOT NULL,
    [estado] NVARCHAR(1000) NOT NULL,
    [sacasCafe] INT NOT NULL,
    [valorLiberado] FLOAT(53) NOT NULL,
    [vencimentoPagamento] DATETIME2 NOT NULL,
    CONSTRAINT [produtor_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
