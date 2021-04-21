function main() {
	const SPREADSHEET_ID: string = ''; // URL:https://docs.google.com/spreadsheets/d/***/edit#gid=0 (*** is the ID)
	const BKUP_FOLDER_ID: string = ''; // URL:https://drive.google.com/drive/folders/*** (*** is the ID)
	const RETENTION_PERIOD: number = 30;

	backupFile(SPREADSHEET_ID, BKUP_FOLDER_ID);
	removeOldFile(BKUP_FOLDER_ID, RETENTION_PERIOD);
}
