const router = require("express").Router(),
  prefix = "v1";

router.use(`/api/${prefix}`, require("./api"));
module.exports = router;
