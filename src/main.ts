const SPREADSHEET_ID = ''
const BKUP_FOLDER_ID = ''

function backupFile() {
	let srcFile: File = DriveApp.getFileById(SPREADSHEET_ID);
	let bkupFolder: Folder = DriveApp.getFolderById(BKUP_FOLDER_ID);
	srcFile.makeCopy(`【${Utilities.formatDate(new Date(), 'JST', 'yyyy-MM-dd')}】${srcFile.getName()}`, bkupFolder);
}

function removeOldFile() {
	let leastValidDate: Date = new Date();
	leastValidDate.setDate(validDate.getDate() - 30);
	let bkupFolder: Folder = DriveApp.getFolderById(BKUP_FOLDER_ID);
	let files: FileIterator = bkup_folder.getFiles();
	while (files.hasNext()) {
		let file: File = files.next();
		if (file.getDateCreated() <= leastValidDate)
			file.setTrashed(true);
	}
}

function main() {
	backupFile();
	removeOldFile();
}
