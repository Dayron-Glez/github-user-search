import Glogo from "@/app/components/icons/GLogo";

const UserCardInfo = () => {
  return (
    <article className="grid-areas rounded-xl bg-blue-900 text-white p-2">
      <div className="grid section-logo rounded-full bg-gray-200 h-24 w-24 place-content-center p-1">
        <Glogo className="relative top-2 h-full w-full" />
      </div>

      <div className="section-title">
        <h2>The Octopus</h2>
        <p className="text-blue-500">@theoctopus</p>
      </div>
      <p className="section-date">Joined 25 Jan 2011</p>
      <p className="section-description">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, quod at
        quos nisi iusto, dolorum necessitatibus repudiandae qui sunt assumenda
        ipsum magni debitis ea eius beatae. Delectus voluptate temporibus
        corrupti.
      </p>

      <div className="section-number flex justify-around bg-blue-950 rounded-lg p-2 mb-4 mt-4">
        <article>
          <p>Repos</p>
          <p>8</p>
        </article>
        <article>
          <p>Followers</p>
          <p>3938</p>
        </article>
        <article>
          <p>Following</p>
          <p>9</p>
        </article>
      </div>
      <div className="section-social md:grid md:grid-cols-2">
        <article>
          <i></i>
          <p>San Francisco</p>
        </article>
        <article>
          <i></i>
          <p>San Francisco</p>
        </article>
        <article>
          <i></i>
          <p>San Francisco</p>
        </article>
        <article>
          <i></i>
          <p>San Francisco</p>
        </article>
      </div>
    </article>
  );
};

export default UserCardInfo;
