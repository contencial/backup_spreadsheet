function backupFile(file_id: string, folder_id: string) {
	let srcFile: File = DriveApp.getFileById(file_id);
	let bkupFolder: Folder = DriveApp.getFolderById(folder_id);
	srcFile.makeCopy(`【${Utilities.formatDate(new Date(), 'JST', 'yyyy-MM-dd')}】${srcFile.getName()}`, bkupFolder);
}
