import express from 'express'
import { jwtDecode } from 'jwt-decode';
import User from './schema/User.js';
import bcrypt from 'bcrypt'
import { encryptObject } from './utils.js';

const route = express.Router()

route.get('/length', async (req, res) => {
    try {
        await User.find().then((results) => {
            res.json({'length': results.length})
        })        
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
})

route.get('/length', async (req, res) => {
    try {
        await User.findById('').then((results) => {
            res.json({'length': results.length})
        })        
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
})

route.put('/op/:userid', async (req, res) => {
    try {
        await User.findById(req.params.userid).then(async (user) => {
            if (!user.peran.includes('admin')) {
                user.peran.push('admin');  // Add 'admin' if it's not already there
                user.save();  // Save the updated user
                const users = await User.find({}).select('nama _id NIS kelas nomorKelas nomorAbsen peran')
                res.status(200).json({ user, msg: 'User is now admin', users });
            } else {
                res.status(400).json({ msg: 'User is already admin' });
            }
        });
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
});

route.put('/deop/:userid', async (req, res) => {
    try {
        await User.findById(req.params.userid).then(async (user) => {
            if (user.peran.includes('admin')) {
                user.peran = user.peran.filter(role => role !== 'admin');  // Remove 'admin'
                user.save();  // Save the updated user
                const users = await User.find({}).select('nama _id NIS kelas nomorKelas nomorAbsen peran')
                res.status(200).json({ user, msg: 'Admin privileges removed', users });
            } else {
                res.status(400).json({ msg: 'User is not an admin' });
            }
        });
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
});


route.post('/daftar', async (req, res) => {
    const dataUser = req.body
    try {
        const exitingUser = await User.findOne({nama: req.body.nama})
        if (exitingUser) return res.status(409).json({ msg: `Pengguna dengan nama "${dataUser.nama}" sudah ada` })

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        dataUser.hash = hashedPassword

        const user = new User(dataUser)

        await user.save().then(data => {
            res.status(201).json({ user: encryptObject(data), msg: 'User berhasil daftar' })
        }).catch(err => {
            throw new Error(err)
        })
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
})

route.put('/:id', async (req, res) => {
    const dataUser = req.body;
    const { alsoreturnallusers } = req.query;
    
    try {
        const exitingUser = await User.findOne({ nama: req.body.nama });
        if (exitingUser && exitingUser._id.toString() !== req.params.id) {
            return res.status(409).json({ msg: `Pengguna dengan nama "${dataUser.nama}" sudah ada` });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: dataUser },
            { new: true }
        );
        
        let users = [];
        if (alsoreturnallusers === 'true') {
            users = await User.find();
        }

        res.status(201).json({ user: encryptObject(user), users, msg: 'User berhasil diperbarui!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});


route.post('/login/form', async (req, res) => {
    const { nama, password } = req.body;
    try {
        const user = await User.findOne({ nama })
        if (!user) {
            return res.status(401).json({ msg: `Tidak ada pengguna dengan nama "${nama}"`});
        }
    
        bcrypt.compare(password, user.hash, (err, result) => {
            if (result) {
                res.json({user: encryptObject(user), msg: 'Login successful' });
            } else {
                res.status(401).json({ msg: 'Password salah!' });
            }
        })
    
      } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
      }
})
route.post('/login/google', async (req, res) => {
    const {picture, email} = jwtDecode(req.body.credential)
    const user = await User.findOne({email: email})

    if (!user) return res.status(401).json({ msg: `Tidak ditemukan akun dengan email yang sama`});

    if (user.avatar !== picture) {
        user.avatar = picture
        await user.save()
    }

    res.json({user: encryptObject(user), msg: 'ok'})
})
route.post('/register/google', async (req, res) => {
    const dataUser = req.body
    try {
        const exitingUser = await User.findOne({nama: req.body.nama})
        if (exitingUser) return res.status(409).json({ msg: `Pengguna dengan nama "${dataUser.nama}" sudah ada` })

        const user = new User(dataUser)

        await user.save().then(data => {
            res.status(201).json({ user: encryptObject(data), msg: 'User berhasil daftar' })
        }).catch(err => {
            throw new Error(err)
        })
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
})

route.post('/bind/google', async (req, res) => {
    const {picture, email} = jwtDecode(req.body.credential)
    const user = await User.findByIdAndUpdate(req.body._id, {$set: {email, avatar: picture}}, {new: true})
    res.json({user: encryptObject(user), msg: 'ok'})
})


export default route
