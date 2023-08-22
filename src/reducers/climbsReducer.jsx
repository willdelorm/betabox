import { nanoid } from "nanoid";

const INITIAL_CLIMB = {
  id: "",
  grade: 0,
  name: "",
  note: "",
  effort: 0,
  style: "Flash",
  attempts: 1,
  isEdited: false,
};

export default function climbsReducer(climbs, action) {
  switch (action.type) {
    case "ADD_CLIMB":
      return [
        {
          ...INITIAL_CLIMB,
          id: nanoid(),
          grade: action.grade,
        },
        ...climbs,
      ];
    case "UPDATE_CLIMB":
      return climbs.map((climb) => {
        if (climb.id === action.climb.id) {
          return action.climb;
        } else {
          return climb;
        }
      });
    case "DELETE_CLIMB":
      return climbs.filter((climb) => climb.id !== action.id);
    default:
      return climbs;
  }
}
