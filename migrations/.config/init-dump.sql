--
-- PostgreSQL database dump
--

-- Dumped from database version 11.16 (Debian 11.16-1.pgdg110+1)
-- Dumped by pg_dump version 11.16 (Debian 11.16-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: firebase; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA firebase;


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: accounts; Type: TABLE; Schema: firebase; Owner: postgres
--

CREATE TABLE firebase.accounts (
    firebase_id character varying(100) NOT NULL,
    account_id uuid NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: users; Type: TABLE; Schema: firebase; Owner: postgres
--

CREATE TABLE firebase.users (
    firebase_id character varying(50) NOT NULL,
    data json,
    created_at timestamp without time zone
);


--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    email character varying(200),
    phone_number character varying(20)
);


--
-- Name: accounts_local; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts_local (
    id uuid NOT NULL,
    email character varying(100) NOT NULL,
    account_id uuid NOT NULL,
    password character varying(200) NOT NULL,
    is_verified boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: app_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.app_users (
    id uuid NOT NULL,
    account_id uuid NOT NULL,
    app_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: apps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.apps (
    id uuid NOT NULL,
    name character varying(200),
    is_primary boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    token uuid NOT NULL,
    user_id uuid NOT NULL,
    device_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    session json
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    name character varying(200),
    first_name character varying(100),
    last_name character varying(100),
    created_at timestamp without time zone DEFAULT now(),
    avatar_url character varying(1000)
);


--
-- Name: accounts accounts_pk; Type: CONSTRAINT; Schema: firebase; Owner: postgres
--

ALTER TABLE ONLY firebase.accounts
    ADD CONSTRAINT accounts_pk PRIMARY KEY (firebase_id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: firebase; Owner: postgres
--

ALTER TABLE ONLY firebase.users
    ADD CONSTRAINT users_pk PRIMARY KEY (firebase_id);


--
-- Name: accounts_local account_local_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_local
    ADD CONSTRAINT account_local_pk PRIMARY KEY (id);


--
-- Name: accounts accounts_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pk PRIMARY KEY (id);


--
-- Name: apps apps_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apps
    ADD CONSTRAINT apps_pk PRIMARY KEY (id);


--
-- Name: tokens tokens_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pk PRIMARY KEY (token);


--
-- Name: app_users user_accounts_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_users
    ADD CONSTRAINT user_accounts_pk PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: accounts_firebase_id_uindex; Type: INDEX; Schema: firebase; Owner: postgres
--

CREATE UNIQUE INDEX accounts_firebase_id_uindex ON firebase.accounts USING btree (firebase_id);


--
-- Name: users_firebase_id_uindex; Type: INDEX; Schema: firebase; Owner: postgres
--

CREATE UNIQUE INDEX users_firebase_id_uindex ON firebase.users USING btree (firebase_id);


--
-- Name: account_local_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX account_local_id_uindex ON public.accounts_local USING btree (id);


--
-- Name: accounts_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX accounts_id_uindex ON public.accounts USING btree (id);


--
-- Name: apps_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX apps_id_uindex ON public.apps USING btree (id);


--
-- Name: tokens_token_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX tokens_token_uindex ON public.tokens USING btree (token);


--
-- Name: user_accounts_user_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_accounts_user_id_uindex ON public.app_users USING btree (id);


--
-- Name: users_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_id_uindex ON public.users USING btree (id);


--
-- Name: accounts_local accounts_local_accounts_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts_local
    ADD CONSTRAINT accounts_local_accounts_id_fk FOREIGN KEY (account_id) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: app_users user_accounts_accounts_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_users
    ADD CONSTRAINT user_accounts_accounts_id_fk FOREIGN KEY (account_id) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: app_users user_accounts_apps_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.app_users
    ADD CONSTRAINT user_accounts_apps_id_fk FOREIGN KEY (app_id) REFERENCES public.apps(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

