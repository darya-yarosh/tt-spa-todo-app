import Storage from "models/Storage";
//import { MOCK_STORAGE } from "models/mockStorage";

export default class StorageController {
    async getStorageData() {
        const stringData = localStorage.getItem('data');

        if (stringData === null) {
            //const storageData: Storage = MOCK_STORAGE;
            const storageData: Storage = {
                projects: []
            }
            this.setStorageData(storageData);
            return;
        }

        const data = JSON.parse(stringData.toString()) as Storage;
        return data;
    }

    async setStorageData(updatedData: Storage) {
        const stringUpdatedData = JSON.stringify(updatedData)
        localStorage.setItem('data', stringUpdatedData);
    }
}