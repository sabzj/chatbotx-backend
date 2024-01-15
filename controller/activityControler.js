import Activity from "../models/activitySchema.js";
import STATUS_CODE from "../constants/statusCodes.js";
import User from "../models/userSchema.js";

export const createActivity = async (req, res, next) => {
  console.log(req.body);
  try {
    console.log(req.body);
    const { name, description, category, location } = req.body;
    const newActivity = await Activity.create({
      name,
      description,
      category,
      location,
    });
    res.status(STATUS_CODE.CREATED);
    res.send(newActivity);
  } catch (error) {
    next(error);
  }
};

export const getActivityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if (!activity) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("No such activity in the db");
    }
    res.send(activity);
  } catch (error) {
    next(error);
  }
};

export const getAllActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find({}); // Populate the 'announcer' field
    res.status(STATUS_CODE.OK);
    res.send(activities);
  } catch (error) {
    next(error);
  }
};
// check if the volunteer activity is announced by more than one
export const announcedActivity = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { activityId } = req.params;
    const activity = await Activity.findById(activityId);
    if (activity.announcer) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("Activity already has been announced");
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { activities: activityId } },
      { new: true }
    );

    if (!user) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("No such user in the db");
    }
    activity.announcer = userId;
    await activity.save();
    res.send(user);
  } catch (error) {
    next(error);
  }
};

// update activity satus

export const updateActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, category, location } = req.body;

    const activity = await Activity.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    //does the activity exist ?
    if (!activity) {
      res.status(404);
      throw new Error("Activity not found");
    }
    //send it back
    res.send(activity);
  } catch (error) {
    next(error);
  }
};
// Controller to delete an activity by id
export const deleteActivity = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the activity to get the onnouncer's information
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("No such activity in the db");
    }

    res.send(`id ${id} was deleted successfully`);
  } catch (error) {
    next(error);
  }
};
