function backupFile() {
	const SPREADSHEET_ID: string = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
	const BKUP_FOLDER_ID: string = PropertiesService.getScriptProperties().getProperty('BKUP_FOLDER_ID');
	const SRC_FILE: File = DriveApp.getFileById(SPREADSHEET_ID);
	const BKUP_FOLDER: Folder = DriveApp.getFolderById(BKUP_FOLDER_ID);
	const URL = "https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID + "/export?format=xlsx";
	const OPTIONS = {
		method: "get",
		headers: {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
		muteHttpExceptions: true
	};
	let response = UrlFetchApp.fetch(URL, OPTIONS);
	if (response.getResponseCode() == 200) {
		BKUP_FOLDER.createFile(response.getBlob())
		.setName(`【${Utilities.formatDate(new Date(), 'JST', 'yyyy-MM-dd')}】${SRC_FILE.getName()}.xlsx`);
	}
}
