function backupFile() {
	const SPREADSHEET_ID: string = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
	const BKUP_FOLDER_ID: string = PropertiesService.getScriptProperties().getProperty('BKUP_FOLDER_ID');
	let srcFile: File = DriveApp.getFileById(SPREADSHEET_ID);
	let bkupFolder: Folder = DriveApp.getFolderById(BKUP_FOLDER_ID);
	srcFile.makeCopy(`【${Utilities.formatDate(new Date(), 'JST', 'yyyy-MM-dd')}】${srcFile.getName()}`, bkupFolder);
}
