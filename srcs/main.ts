function main() {
	const SPREADSHEET_ID = '' // URL:https://docs.google.com/spreadsheets/d/***/edit#gid=0 (*** is the ID)
	const BKUP_FOLDER_ID = '' // URL:https://drive.google.com/drive/folders/*** (*** is the ID)

	backupFile(SPREADSHEET_ID, BKUP_FOLDER_ID);
	removeOldFile(BKUP_FOLDER_ID);
}
