import { Form, NavLink } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import logomark from "../assets/logomark.svg";

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to home">
        <img src={logomark} alt="" height={30} />
        <span>React Budget</span>
      </NavLink>

      {userName && (
        <Form
          method="post"
          action="logout"
          onSubmit={(event) => {
            if (!confirm("Delete user and all data?")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <span>Delete User</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
};
export default Nav;

/* 
Want to conditionally show form if i have a username. Form is from router-dom, and it handles it. action means where to submit it to, and I want it to go to a logout path.  

Because this is submitting a form, I can handle that in the application. I don't want people to log out immediately. I want a check in place to see if that's what they actually want. Throw an onSubmit, which takes the event. If confirm, pass in the message. If that is the case, e.preventDefault(), don't submit form. 

The result is a popup that asks if user wants to delete all data. If user clicks cancel- e.preventDefault kicks in. But if user clicks OK then it should send user to our path, which is logout. 


*/
