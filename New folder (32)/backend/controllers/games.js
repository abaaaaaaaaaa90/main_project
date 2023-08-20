import Game from "../models/game";
import User from "../models/user";
import slugify from "slugify";
export const CreateGame = async (req, res) => {
  try {
    console.log(req.body);
    const { name, description, numberOfUser } = req.body;

    if (!name) return res.status(400).send("name is required");

    const alreadyExist = await Game.findOne({
      slug: slugify(req.body.name.toLowerCase()),
    });
    if (alreadyExist) return res.status(400).send("Title is taken");

    // create
    const game = new Game({
      name,
      description,
      numberOfUser,
      slug: slugify(req.body.name),
    });
    await game.save();

    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const games = async (req, res) => {
  let currentPage = req.query.currentPage;
  console.log(currentPage);

  const offest = currentPage * 6;

  const result = {};
  result.result = await Game.find().exec();

  const currentPageData = result["result"].slice(offest, offest + 6);

  console.log("Current page data >>>>>>>>>", currentPageData);
  console.log("current page >>>>>>>>>>>.", currentPage);

  const pagaCount = Math.ceil(result["result"].length / 6);
  const c = result["result"];
  res.json({
    currentPageData: result["result"].length == 1 ? c : currentPageData,
    pageCount: pagaCount,
  });
};

export const game = async (req, res) => {
  try {
    console.log("*********************", req.params);
    const game = await Game.findOne({ slug: req.params.slug }).exec();
    res.json(game);
  } catch (err) {
    console.log(err);
  }
};

export const gameRequest = async (req, res) => {
  try {
    console.log(req.body);

    const { gameId, userId } = req.body;

    console.log("{{{{{{{{{{{userId", userId);
    if (!userId) return res.status(400).send("try egain....");

    const game = await Game.findOne({ name: gameId }).exec();
    const { requests } = game;

    const user = await User.findOne({ name: userId }).exec();
    if (!user) return res.status(400).send("try egain....");
    const { gameRequests } = user;

    console.log("%%%%%%%%%%%%%%%%", user["name"]);
    // registe
    const update = await User.findOneAndUpdate(
      { name: userId },
      { gameRequests: [...gameRequests, gameId] },
      {
        new: true,
      }
    ).exec();

    const updated = await Game.findOneAndUpdate(
      { name: gameId },
      { requests: [...requests, userId] },
      {
        new: true,
      }
    ).exec();

    // console.log(x);
    res.json({ updated: updated, update: update });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const gameRequests = async (req, res) => {
  try {
    console.log(req.body);

    const { slug } = req.params;

    const game = await Game.findOne({ slug: slug }).exec();
    const { requests } = game;
    const { gameUsers } = game;

    console.log(game);

    const users = await User.find({ role: "user" }).exec();

    const users_list = [];
    const users_in_game = [];

    let i;

    let u;

    for (i in requests) {
      for (u in users) {
        console.log(users[u]);
        if (requests[i] == users[u]["name"]) {
          users_list.push(users[u]);
        }
      }
    }

    for (i in gameUsers) {
      for (u in users) {
        console.log(users[u]);
        if (gameUsers[i] == users[u]["name"]) {
          users_in_game.push(users[u]);
        }
      }
    }

    console.log("###########", users_list);
    console.log("###########", users_in_game);

    res.json({ users_list: users_list, users_in_game: users_in_game });
    // registe
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const gameUpdated = async (req, res) => {
  try {
    console.log(req.body);

    const { userId, gameSlug } = req.body;
    const { slug } = req.params;

    if (!userId) return res.status(400).send("try egain....");

    const game = await Game.findOne({ slug: slug }).exec();
    const { gameUsers } = game;

    const user = await User.findOne({ name: userId }).exec();
    const { games } = user;

    console.log(gameUsers);
    console.log(games);

    const update = await User.findOneAndUpdate(
      { name: userId },
      { games: [...games, game["name"]] },
      {
        new: true,
      }
    ).exec();

    const updated = await Game.findOneAndUpdate(
      { slug: slug },
      { gameUsers: [...gameUsers, userId] },
      {
        new: true,
      }
    ).exec();

    res.json({ updated: updated, update: update });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const updated = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    console.log(req.params);
    console.log(req.body);
    const game = await Game.findByIdAndUpdate({ _id }).exec();
    console.log(game);
    const updated = await Game.findByIdAndUpdate({ _id }, req.body, {
      new: true,
    }).exec();
    // console.log(updated);

    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }

  // console.log(x);
};
