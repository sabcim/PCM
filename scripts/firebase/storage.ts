import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export async function addImageToStorage(file: any) {

    const storageRef = ref(storage, file.name)

    try {

        await uploadBytes(storageRef, file)
        return await getDownloadURL(storageRef)
    } catch (e) {

        throw e
    }
}