function createZipFile() {
	const SPREADSHEET_ID: string = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
	const BKUP_FOLDER_ID: string = PropertiesService.getScriptProperties().getProperty('BKUP_FOLDER_ID');
	const OLD_FOLDER_ID: string = PropertiesService.getScriptProperties().getProperty('OLD_FOLDER_ID');
	let srcFile: File = DriveApp.getFileById(SPREADSHEET_ID);
	let bkupFolder: Folder = DriveApp.getFolderById(BKUP_FOLDER_ID);
	let files: FileIterator = bkupFolder.getFiles();
	let blobs: Array<Blob> = new Array();
	let today: Date = new Date();
	while (files.hasNext()) {
		let file: File = files.next();
		blobs.push(file.getBlob());
	}
	let zipFile: Blob = Utilities.zip(blobs, `【${Utilities.formatDate(new Date(), 'JST', 'yyyy-MM')}】${srcFile.getName()}`);
	let oldFolder: Folder = DriveApp.getFolderById(OLD_FOLDER_ID);
	oldFolder.createFile(zipFile);
	files = bkupFolder.getFiles();
	while (files.hasNext()) {
		let file: File = files.next();
		file.setTrashed(true);
	}
}
