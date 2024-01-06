import { Form } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import illustration from "../assets/illustration1.png";

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Control Your <span className="accent">Finances!</span>
        </h1>
        <p>React Budget will ensure your expenses are in check. Sign in to start.</p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser"/>
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={illustration} alt="Person with money" width={600} />
    </div>
  );
};
export default Intro;

/*
By default with any form, if you submit it, and you don't handle it- it will submit it to that exact page. This is actually what we want as it's already on Dashboard. Can leave action blank. 


*/
