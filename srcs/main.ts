function main() {
	const SPREADSHEET_ID: string = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
	const BKUP_FOLDER_ID: string = PropertiesService.getScriptProperties().getProperty('BKUP_FOLDER_ID');
	const RETENTION_PERIOD: number = 30;

	backupFile(SPREADSHEET_ID, BKUP_FOLDER_ID);
	removeOldFile(BKUP_FOLDER_ID, RETENTION_PERIOD);
}
