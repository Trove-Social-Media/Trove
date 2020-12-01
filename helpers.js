//const imageFilter = function(req, file, cb) {
//    // Accept images only
//    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//        req.fileValidationError = 'Only image files are allowed!';
//        return cb(new Error('Only image files are allowed!'), false);
//    }
//    cb(null, true);
//};
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'audio/mpeg' ||
    file.mimetype === 'audio/wave' ||
    file.mimetype === 'audio/wav' ||
    file.mimetype === 'audio/mp3'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
};
exports.fileFilter = fileFilter;
//exports.imageFilter = imageFilter;