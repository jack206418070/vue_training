import axios from 'axios'
class MyUploadAdapter {
  constructor (loader) {
    // The file loader instance to use during the upload.
    this.loader = loader
  }

  // Starts the upload process.
  upload () {
    const formData = new FormData()
    const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_PATH}/admin/upload`
    let file
    return new Promise((resolve) => {
      this.loader.file
        .then(loadFile => {
          file = loadFile
          formData.append('file-to-upload', file)
          return axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
            resolve({
              default: res.data.imageUrl
            })
          })
        })
    })
  }

  abort () {
    if (this.xhr) {
      this.xhr.abort()
    }
  }
}
export default MyUploadAdapter
