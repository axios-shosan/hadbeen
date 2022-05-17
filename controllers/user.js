const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

exports.getAllusers = (req, res) => {
  console.log("getting all users");
  res.send();
};

//inscription
exports.register = async (req, res) => {
  try {
    //verifier si l'utilisateur existe deja dans la bdd (en utilisant son email)
    const exist = await User.findOne({email : req.body.email});

    //si oui alors retourner une erreur
    if(exist)
      return res.status(402).json({message: "use another email"});

    //sinon on destructure la requete et on crée un nv document dans la bdd 
    const {name, email, password} = req.body;
    const user = new User({name, email, password});
    await user.save();
  
    //creer un token au nouvel utilisateur créé
    if(user){
      const token= jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin
        },

        //var JW presente dans le fichier .ens qui permet le hashage de l'utilisateur
        process.env.JW,
        {expiresIn: "3d"}
      );
      

      //sauvegarder le token dans un cookie
      res.cookie("token",token ,{
        sameSite: 'strict',
        // secure: true,
        // httpOnly: true,
        expires: new Date(new Date().getTime() + 720000000),
      })

      //retourner l'utilisateur sans le mdp et le statut admin
      const { password, isAdmin, ...others} = user._doc;
      res.status(200).json(others);
    }

    //si l'utilisateur n'a pas était créé
    throw new Error("user wasn't created")
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: error.message,
      message: 'error in registerUser in user Controller',
    });    
  }
};

exports.login = async (req, res) => {
  try {

    //récuperer l'email entré  
    const {email} = req.body;
    //verifier si l'utilisateur existe déja dans la bdd
    const user = await User.findOne({email});

    //si l'utilisateur n'existe pas
    if(!user){
      return res.status(401).json({message: 'utilisateur inexistant'});
    }

    //sinon on vérifie le mdp 
    if(!user.comparePassword( req.body.password)) { //methode non prédefinie  
      //mdp incorrect
      return res.status(401).json({message: 'Mot de passe incorrect'});
    }


    //user exist + mdp correct :
    const token= jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JW,
      {expiresIn: "3d"}
    );
    
    res.cookie("token",token ,{
      sameSite: 'strict',
      // secure: true,
      // httpOnly: true,
      expires: new Date(new Date().getTime() + 720000000),
    })

    const { password, isAdmin, ...others} = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: 'error in Login User in user Controller',
    });   
  }
}


// exports.createUser = async (req, res) => {

//   const user = new User(data);

//   await user.save()

//   res.json(user._doc);
// };



// exports.deleteUser = async (req,res) => {
//   await user.deleteOne({_id: req.params.id})

// };


