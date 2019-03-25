--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.15
-- Dumped by pg_dump version 10.4

-- Started on 2019-02-09 14:47:49 EET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12361)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2176 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 187 (class 1259 OID 16417)
-- Name: board; Type: TABLE; Schema: public; Owner: kanbahner
--

CREATE TABLE public.board (
    id integer NOT NULL,
    name character varying NOT NULL,
    "projectId" integer NOT NULL
);


ALTER TABLE public.board OWNER TO kanbahner;

--
-- TOC entry 186 (class 1259 OID 16415)
-- Name: board_id_seq; Type: SEQUENCE; Schema: public; Owner: kanbahner
--

CREATE SEQUENCE public.board_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.board_id_seq OWNER TO kanbahner;

--
-- TOC entry 2177 (class 0 OID 0)
-- Dependencies: 186
-- Name: board_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanbahner
--

ALTER SEQUENCE public.board_id_seq OWNED BY public.board.id;


--
-- TOC entry 189 (class 1259 OID 16428)
-- Name: lane; Type: TABLE; Schema: public; Owner: kanbahner
--

CREATE TABLE public.lane (
    id integer NOT NULL,
    name character varying NOT NULL,
    "boardId" integer
);


ALTER TABLE public.lane OWNER TO kanbahner;

--
-- TOC entry 191 (class 1259 OID 16439)
-- Name: list; Type: TABLE; Schema: public; Owner: kanbahner
--

CREATE TABLE public.list (
    id integer NOT NULL,
    name character varying NOT NULL,
    lane character varying NOT NULL,
    "laneIdId" integer
);


ALTER TABLE public.list OWNER TO kanbahner;

--
-- TOC entry 185 (class 1259 OID 16406)
-- Name: project; Type: TABLE; Schema: public; Owner: kanbahner
--

CREATE TABLE public.project (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.project OWNER TO kanbahner;

--
-- TOC entry 192 (class 1259 OID 16448)
-- Name: project_owners_user; Type: TABLE; Schema: public; Owner: kanbahner
--

CREATE TABLE public.project_owners_user (
    "projectId" integer NOT NULL,
    "userGoogleId" character varying NOT NULL
);


ALTER TABLE public.project_owners_user OWNER TO kanbahner;

--
-- TOC entry 183 (class 1259 OID 16395)
-- Name: task; Type: TABLE; Schema: public; Owner: kanbahner
--

CREATE TABLE public.task (
    id integer NOT NULL,
    title character varying NOT NULL,
    index integer NOT NULL,
    "listId" integer NOT NULL
);


ALTER TABLE public.task OWNER TO kanbahner;

--
-- TOC entry 193 (class 1259 OID 16567)
-- Name: flatall; Type: VIEW; Schema: public; Owner: kanbahner
--

CREATE VIEW public.flatall AS
 SELECT p.id AS project_id,
    o."userGoogleId" AS owner_id,
    p.name AS project_name,
    b.name AS board_name,
    b.id AS board_id,
    l.name AS lane_name,
    l.id AS lane_id,
    c.name AS column_name,
    c.id AS column_id,
    t.title AS task_title,
    t.id AS task_id,
    t.index AS task_index
   FROM (((((public.project p
     LEFT JOIN public.project_owners_user o ON ((p.id = o."projectId")))
     LEFT JOIN public.board b ON ((p.id = b."projectId")))
     LEFT JOIN public.lane l ON ((b.id = l."boardId")))
     LEFT JOIN public.list c ON ((l.id = c."laneIdId")))
     LEFT JOIN public.task t ON ((c.id = t."listId")));


ALTER TABLE public.flatall OWNER TO kanbahner;

--
-- TOC entry 188 (class 1259 OID 16426)
-- Name: lane_id_seq; Type: SEQUENCE; Schema: public; Owner: kanbahner
--

CREATE SEQUENCE public.lane_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lane_id_seq OWNER TO kanbahner;

--
-- TOC entry 2178 (class 0 OID 0)
-- Dependencies: 188
-- Name: lane_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanbahner
--

ALTER SEQUENCE public.lane_id_seq OWNED BY public.lane.id;


--
-- TOC entry 190 (class 1259 OID 16437)
-- Name: list_id_seq; Type: SEQUENCE; Schema: public; Owner: kanbahner
--

CREATE SEQUENCE public.list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.list_id_seq OWNER TO kanbahner;

--
-- TOC entry 2179 (class 0 OID 0)
-- Dependencies: 190
-- Name: list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanbahner
--

ALTER SEQUENCE public.list_id_seq OWNED BY public.list.id;


--
-- TOC entry 184 (class 1259 OID 16404)
-- Name: project_id_seq; Type: SEQUENCE; Schema: public; Owner: kanbahner
--

CREATE SEQUENCE public.project_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_id_seq OWNER TO kanbahner;

--
-- TOC entry 2180 (class 0 OID 0)
-- Dependencies: 184
-- Name: project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanbahner
--

ALTER SEQUENCE public.project_id_seq OWNED BY public.project.id;


--
-- TOC entry 182 (class 1259 OID 16393)
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: kanbahner
--

CREATE SEQUENCE public.task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.task_id_seq OWNER TO kanbahner;

--
-- TOC entry 2181 (class 0 OID 0)
-- Dependencies: 182
-- Name: task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanbahner
--

ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;


--
-- TOC entry 181 (class 1259 OID 16385)
-- Name: user; Type: TABLE; Schema: public; Owner: kanbahner
--

CREATE TABLE public."user" (
    "googleId" character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO kanbahner;

--
-- TOC entry 2030 (class 2604 OID 16420)
-- Name: board id; Type: DEFAULT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.board ALTER COLUMN id SET DEFAULT nextval('public.board_id_seq'::regclass);


--
-- TOC entry 2031 (class 2604 OID 16431)
-- Name: lane id; Type: DEFAULT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.lane ALTER COLUMN id SET DEFAULT nextval('public.lane_id_seq'::regclass);


--
-- TOC entry 2032 (class 2604 OID 16442)
-- Name: list id; Type: DEFAULT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.list ALTER COLUMN id SET DEFAULT nextval('public.list_id_seq'::regclass);


--
-- TOC entry 2029 (class 2604 OID 16409)
-- Name: project id; Type: DEFAULT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.project ALTER COLUMN id SET DEFAULT nextval('public.project_id_seq'::regclass);


--
-- TOC entry 2028 (class 2604 OID 16398)
-- Name: task id; Type: DEFAULT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);


--
-- TOC entry 2034 (class 2606 OID 16392)
-- Name: user PK_470355432cc67b2c470c30bef7c; Type: CONSTRAINT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_470355432cc67b2c470c30bef7c" PRIMARY KEY ("googleId");


--
-- TOC entry 2038 (class 2606 OID 16414)
-- Name: project PK_4d68b1358bb5b766d3e78f32f57; Type: CONSTRAINT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY (id);


--
-- TOC entry 2042 (class 2606 OID 16436)
-- Name: lane PK_6f644b474f05aa5b7ffb22ba8e9; Type: CONSTRAINT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.lane
    ADD CONSTRAINT "PK_6f644b474f05aa5b7ffb22ba8e9" PRIMARY KEY (id);


--
-- TOC entry 2040 (class 2606 OID 16425)
-- Name: board PK_865a0f2e22c140d261b1df80eb1; Type: CONSTRAINT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY (id);


--
-- TOC entry 2044 (class 2606 OID 16447)
-- Name: list PK_d8feafd203525d5f9c37b3ed3b9; Type: CONSTRAINT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.list
    ADD CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY (id);


--
-- TOC entry 2046 (class 2606 OID 16455)
-- Name: project_owners_user PK_f109909e1074d447e3a14c8a236; Type: CONSTRAINT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.project_owners_user
    ADD CONSTRAINT "PK_f109909e1074d447e3a14c8a236" PRIMARY KEY ("projectId", "userGoogleId");


--
-- TOC entry 2036 (class 2606 OID 16403)
-- Name: task PK_fb213f79ee45060ba925ecd576e; Type: CONSTRAINT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id);


--
-- TOC entry 2052 (class 2606 OID 16481)
-- Name: project_owners_user FK_76e30f724854692260f4f3f13e5; Type: FK CONSTRAINT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.project_owners_user
    ADD CONSTRAINT "FK_76e30f724854692260f4f3f13e5" FOREIGN KEY ("userGoogleId") REFERENCES public."user"("googleId") ON DELETE CASCADE;


--
-- TOC entry 2048 (class 2606 OID 16461)
-- Name: board FK_954fce22cf9a797afc6b1560c76; Type: FK CONSTRAINT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT "FK_954fce22cf9a797afc6b1560c76" FOREIGN KEY ("projectId") REFERENCES public.project(id) ON DELETE CASCADE;


--
-- TOC entry 2049 (class 2606 OID 16466)
-- Name: lane FK_b577a45ba3422b2d8fb741f5095; Type: FK CONSTRAINT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.lane
    ADD CONSTRAINT "FK_b577a45ba3422b2d8fb741f5095" FOREIGN KEY ("boardId") REFERENCES public.board(id) ON DELETE CASCADE;


--
-- TOC entry 2051 (class 2606 OID 16476)
-- Name: project_owners_user FK_c1e89fe873b05fc876dc7066020; Type: FK CONSTRAINT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.project_owners_user
    ADD CONSTRAINT "FK_c1e89fe873b05fc876dc7066020" FOREIGN KEY ("projectId") REFERENCES public.project(id) ON DELETE CASCADE;


--
-- TOC entry 2047 (class 2606 OID 16456)
-- Name: task FK_d2275fe92da6a114d70796b7344; Type: FK CONSTRAINT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_d2275fe92da6a114d70796b7344" FOREIGN KEY ("listId") REFERENCES public.list(id) ON DELETE CASCADE;


--
-- TOC entry 2050 (class 2606 OID 16471)
-- Name: list FK_dd36bbcf6b3d188fe3d11958323; Type: FK CONSTRAINT; Schema: public; Owner: kanbahner
--

ALTER TABLE ONLY public.list
    ADD CONSTRAINT "FK_dd36bbcf6b3d188fe3d11958323" FOREIGN KEY ("laneIdId") REFERENCES public.lane(id) ON DELETE CASCADE;


--
-- TOC entry 2175 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: kanbahner
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM kanbahner;
GRANT ALL ON SCHEMA public TO kanbahner;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2019-02-09 14:47:49 EET

--
-- PostgreSQL database dump complete
--

