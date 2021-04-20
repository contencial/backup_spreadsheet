const SPREADSHEET_ID = '' // URL:https://docs.google.com/spreadsheets/d/***/edit#gid=0 (*** is the ID)
const BKUP_FOLDER_ID = '' // URL:https://drive.google.com/drive/folders/*** (*** is the ID)

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
