import { nanoid } from "nanoid";

export default function sessionsReducer(sessions, action) {
  switch (action.type) {
    case "ADD_SESSION":
      return [
        {
          id: nanoid(),
          ...action.payload,
        },
        ...sessions,
      ];
  }
}
