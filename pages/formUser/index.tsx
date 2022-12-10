import { useForm } from 'react-hook-form';
import Link from 'next/link';

interface FormData {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function FormUser() {
  const { register, handleSubmit, getValues } = useForm<FormData>()
  const onSubmit = handleSubmit((values: any) => {
    alert("Form submit: " + JSON.stringify(values));
  })

  return (
    <div className="font-mono bg-gray-200 flex h-screen">
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-center">
              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg ">
                <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={onSubmit}>
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <h1>
                        First Name
                      </h1>
                      <input {...register('firstName', {required: true})}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="md:ml-2">
                      <h1>
                        Last Name
                      </h1>
                      <input {...register('secondName', {required: true})}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <h1>
                      Email
                    </h1>
                    <input {...register('email', {required: true})}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      type="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <h1>
                        Password
                      </h1>
                      <input {...register('password', {required: true})}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="******************"
                      />
                      <div className="text-xs italic text-red-500">Please choose a password.</div>
                    </div>
                    <div className="md:ml-2">
                      <h1>
                        Confirm Password
                      </h1>
                      <input {...register('confirmPassword', {required: true, validate: (value: any) => value === getValues('password')})}
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="******************"
                      />
                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Register Account
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    >
                      Already have an account? Login!
                    </a>
                    <div>
                    <Link className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="/">Back to home</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

