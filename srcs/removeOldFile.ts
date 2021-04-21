function removeOldFile(folder_id: string, retention_period: number) {
	let leastValidDate: Date = new Date();
	leastValidDate.setDate(leastValidDate.getDate() - retention_period);
	let bkupFolder: Folder = DriveApp.getFolderById(folder_id);
	let files: FileIterator = bkupFolder.getFiles();
	while (files.hasNext()) {
		let file: File = files.next();
		if (file.getDateCreated() <= leastValidDate)
			file.setTrashed(true);
	}
}
