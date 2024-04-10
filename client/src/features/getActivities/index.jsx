import { useState } from "react";
import { useDispatch } from "react-redux";
import { ActionDeleteActivity } from "../../redux/actions/activityAction";
import UpdateActivity from "../updateActivity";

import "./allActivities.scss";

//import custom hooks
import useActivities from "../../hooks/useActivities";
import useToken from "../../hooks/useToken";

/**
 * Component that displays all activities.
 * @returns {JSX.Element} The rendered component.
 */
function AllActivities() {
  const dispatch = useDispatch();
  const activities = useActivities();
  const token = useToken();
  const [onOpen, setOnOpen] = useState(false);
  const [activity, setActivity] = useState(null);

  /**
   * Handles the delete action for an activity.
   * @param {string} id - The ID of the activity to delete.
   */
  const handleDelete = (id) => {
    dispatch(ActionDeleteActivity({ token: token, id: id }));
  };

  /**
   * Handles the edit action for an activity.
   * @param {object} activity - The activity to edit.
   */
  const handleEdit = (activity) => {
    setActivity(activity);
    setOnOpen(true);
  };

  return (
    <>
      <article className="allActivities">
        <h3>Activities enregistrées</h3>
        <table className="allActivities_table">
          <thead>
            <tr>
              <th>Nom</th>
              {/* <th>Description</th> */}
              <th>Type de formule</th>
              <th>Prix</th>
              <th>Nombre de personnes</th>
              <th>Age minimum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.name}</td>
                {/* <td>{activity.description}</td> */}
                <td>
                  {activity.half_day && "Demi-journée"}
                  {activity.half_day && activity.full_day && " | "}
                  {activity.full_day && "Journée"}
                </td>
                <td>
                  {activity.half_day && activity.price_half_day && activity.price_half_day + "€"}
                  {activity.full_day && activity.half_day && activity.price_half_day && activity.price_full_day && " | "}
                  {activity.full_day && activity.price_full_day && activity.price_full_day + "€"}
                </td>
                <td>
                  {activity.min_number_of_people && "Min : " + activity.min_number_of_people}
                  {activity.max_number_of_people && activity.min_number_of_people && " | "}
                  {activity.max_number_of_people && "Max : " + activity.max_number_of_people}
                </td>
                <td>{activity.minimum_age + " ans"}</td>
                <td className="action">
                  <button
                    onClick={() => handleEdit(activity)}
                    className="btn-warning-outline small"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(activity._id)}
                    className="btn-danger-outline small"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
      {onOpen && (
        <UpdateActivity
          onOpen={onOpen}
          modalClosed={(e) => setOnOpen(e)}
          activ={activity}
        />
      )}
    </>
  );
}

export default AllActivities;
