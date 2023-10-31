import React, { useState } from "react";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import axios from "axios";
import Router from "next/router";
import HeaderMenu from "@/components/header";

const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  success: "",
  error: "",
  login_error: "",
};

export default function signin({ providers, callbackUrl, csrfToken }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    password_confirmation,
    success,
    error,
    login_error,
  } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email wajib diisi")
      .email("Alamat email tidak valid"),
    login_password: Yup.string().required("Kata sandi wajib diisi"),
  });

  const registerValidation = Yup.object({
    name: Yup.string()
      .required("Nama wajib diisi")
      .min(2, "Nama minimal 2 hingga 16 karakter")
      .max(16, "Nama maksimal 16 karakter")
      .matches(/^[a-zA-Z]+$/, "Nama harus berisi huruf saja"),
    email: Yup.string()
      .required(
        "Anda akan memerlukannya saat login dan jika Anda perlu mereset kata sandi."
      )
      .email("Masukkan alamat email yang valid."),
    password: Yup.string()
      .required(
        "Masukkan kombinasi setidaknya enam angka, huruf, dan tanda baca (seperti ! dan &)."
      )
      .min(6, "Kata sandi minimal 6 karakter.")
      .max(36, "Kata sandi tidak boleh lebih dari 36 karakter"),
    password_confirmation: Yup.string()
      .required("Konfirmasikan kata sandi Anda.")
      .oneOf([Yup.ref("password")], "Kata sandi harus sama."),
  });

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn("credentials", options);
        if (res) {
          Router.push("/");
        }
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };

  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, error: "", success: "" });
    setLoading(false);
    if (res.error) {
      setLoading(false);
      setUser({ ...user, success: "", login_error: res?.error });
    } else {
      return Router.push(callbackUrl || "/");
    }
  };

  return (
    <>
      {loading && (
        <div
          loading={loading}
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-70 z-50"
        >
          <div className="bg-white p-4 rounded shadow-lg">
            <div className="animate-spin h-10 w-10 border-t-2 border-blue-500 rounded-full border-r-2 border-gray-300"></div>
          </div>
        </div>
      )}
      <HeaderMenu />
      <div className="p-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="mb-4">
            <span>
              Ingin bergabung dengan kami? <Link href="/">Ke Toko</Link>
            </span>
          </div>
          <div>
            <h1 class="text-2xl mb-2">Masuk</h1>
            <p>
              Dapatkan akses ke salah satu layanan E-shopping terbaik di dunia.
            </p>
            <Formik
              enableReinitialize
              initialValues={{ login_email, login_password }}
              validationSchema={loginValidation}
              onSubmit={() => {
                signInHandler();
              }}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />
                  <input
                    type="text"
                    name="login_email"
                    placeholder="Alamat Email"
                    value={login_email}
                    onChange={handleChange}
                    className="border p-2 mb-2"
                  />
                  <input
                    type="password"
                    name="login_password"
                    placeholder="Kata Sandi Anda"
                    value={login_password}
                    onChange={handleChange}
                    className="border p-2 mb-2"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Masuk
                  </button>
                  {login_error && (
                    <span className="text-red-500">{login_error}</span>
                  )}
                  <div className="mt-2">
                    <Link href="/auth/forgot">Lupa Kata Sandi?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div class="mt-4">
              <span class="mb-2">Atau masuk dengan:</span>
              <div>
                {providers.map((provider) => {
                  if (provider.name === "Credentials") {
                    return;
                  }
                  return (
                    <div key={provider.name} className="mb-2">
                      <button
                        onClick={() => signIn(provider.id)}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="mb-4"></div>
          <div>
            <h1 class="text-2xl mb-2">Daftar</h1>
            <p>
              Dapatkan akses ke salah satu layanan E-shopping terbaik di dunia.
            </p>
            <Formik
              enableReinitialize
              initialValues={{ name, email, password, password_confirmation }}
              validationSchema={registerValidation}
              onSubmit={() => signUpHandler()}
            >
              {(form) => (
                <Form>
                  <input
                    type="text"
                    name="name"
                    placeholder="Masukkan Nama Lengkap"
                    value={name}
                    onChange={handleChange}
                    className="border p-2 mb-2"
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="Alamat Email"
                    value={email}
                    onChange={handleChange}
                    className="border p-2 mb-2"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Kata Sandi Anda"
                    value={password}
                    onChange={handleChange}
                    className="border p-2 mb-2"
                  />
                  <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Ketik Ulang Kata Sandi Anda"
                    value={password_confirmation}
                    onChange={handleChange}
                    className="border p-2 mb-2"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Daftar
                  </button>
                </Form>
              )}
            </Formik>
            {success && <div class="text-green-500">{success}</div>}
            {error && <div class="text-red-500">{error}</div>}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  const session = await getSession({ req });
  const callbackUrl = query.callbackUrl;

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }

  const crsfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());
  return {
    props: { providers, crsfToken, callbackUrl },
  };
}
