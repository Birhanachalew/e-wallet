import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Profile.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {
  uploadProfileImage,
} from '../../features/upload/uploadSlice'
import { updateUser, reset } from '../../features/auth/authSlice'
import Loader from '../../components/Loader/Loader'

const Profile = () => {
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  const { name, _id, image, email, phone, address } = user || {}
  const { uploadLoading, uploadSuccess } = useSelector((state) => state.upload)
  const [file, setFile] = useState('')
  const [photo, setPhoto] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: name || '',
        email: email || '',
        phone: phone || '',
        password: '',
        address: address || '',
      })
    }
  }, [user, name, email, phone, address])

  useEffect(() => {
    if (isError) {
      alert(message)
    }
    if (isSuccess) {
      dispatch(reset())
    }
  }, [dispatch, isError, isSuccess, message])

  const previewFiles = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setPhoto(reader.result)
    }
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    setFile(file)
    previewFiles(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      id: _id,
      photo: photo,
    }
    dispatch(uploadProfileImage(data))
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    }

    if (formData.password) {
      payload.password = formData.password
    }

    dispatch(updateUser(payload))
  }

  return (
    <div className='profile'>
      <Sidebar />
      <div className='profileContainer'>
        <Navbar />
        <div className='userProfile'>
          <div className='profilePhoto'>
            {uploadLoading ? (
              <Loader />
            ) : (
              <>
                <h1>{name}</h1>
                {photo ? (
                  <img src={photo} alt='photo' className='profileImage' />
                ) : image ? (
                  <img src={image} alt='userPhoto' className='profileImage' />
                ) : (
                  <AccountCircleIcon className='profileIcon' />
                )}
                {!image && !uploadSuccess && (
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                      type='file'
                      name='photo'
                      id='photo'
                      onChange={(e) => handleChange(e)}
                    />
                    <div className='uploadBtn'>
                      <button type='submit'>upload new photo</button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
          <div className='profileDetails'>
            <h1>details</h1>
            <form onSubmit={onSubmit}>
              <div className='form__control'>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={formData.name}
                  onChange={onChange}
                  placeholder='please enter name'
                  required
                />
              </div>
              <div className='form__control'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={formData.email}
                  onChange={onChange}
                  placeholder='please enter email'
                  required
                />
              </div>
              <div className='form__control'>
                <input
                  type='text'
                  name='phone'
                  id='phone'
                  value={formData.phone}
                  onChange={onChange}
                  placeholder='please enter phone'
                  required
                />
              </div>
              <div className='form__control'>
                <input
                  type='password'
                  name='password'
                  id='password'
                  value={formData.password}
                  onChange={onChange}
                  placeholder='leave blank to keep password'
                />
              </div>
              <div className='form__control'>
                <input
                  type='text'
                  name='address'
                  id='address'
                  value={formData.address}
                  onChange={onChange}
                  placeholder='type address'
                  required
                />
              </div>
              <div className='form__control button-container'>
                <button className='btn' disabled={isLoading}>Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
