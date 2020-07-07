const requestRespone = {
  gagal: (pesan) => {
    return {
      sukses: false,
      pesan: pesan
    }
  },
  sukses: (pesan) => {
    return {
      sukses: true,
      pesan: pesan
    }
  },
  serverError: {
    sukses: false,
    pesan: 'server error'
  },
  suksesLogin: (data) => {
    return {
      sukses: true,
      pesan:  'Login Success',
      data: data
    }
  },
  suksesWithData: (data) => {
    return {
      sukses: true,
      pesan: 'Data has been loaded',
      data: data
    }
  }
}

module.exports = { requestRespone }