
--
-- Name: department; Type: TABLE; Schema: public; Owner: grocerylister; Tablespace:
--

CREATE TABLE department (
    id bigint NOT NULL,
    name character varying(255)
);


ALTER TABLE department OWNER TO grocerylister;

--
-- Name: department_id_seq; Type: SEQUENCE; Schema: public; Owner: grocerylister
--

CREATE SEQUENCE department_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE department_id_seq OWNER TO grocerylister;

--
-- Name: department_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grocerylister
--

ALTER SEQUENCE department_id_seq OWNED BY department.id;


--
-- Name: grocery_list; Type: TABLE; Schema: public; Owner: grocerylister; Tablespace:
--

CREATE TABLE grocery_list (
    id bigint NOT NULL,
    name character varying(255),
    last_modified timestamp without time zone DEFAULT now()
);


ALTER TABLE grocery_list OWNER TO grocerylister;

--
-- Name: grocery_list_id_seq; Type: SEQUENCE; Schema: public; Owner: grocerylister
--

CREATE SEQUENCE grocery_list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE grocery_list_id_seq OWNER TO grocerylister;

--
-- Name: grocery_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grocerylister
--

ALTER SEQUENCE grocery_list_id_seq OWNED BY grocery_list.id;


--
-- Name: grocery_list_product; Type: TABLE; Schema: public; Owner: grocerylister; Tablespace:
--

CREATE TABLE grocery_list_product (
    grocery_list_id bigint NOT NULL,
    product_id bigint NOT NULL
);


ALTER TABLE grocery_list_product OWNER TO grocerylister;

--
-- Name: product; Type: TABLE; Schema: public; Owner: grocerylister; Tablespace:
--

CREATE TABLE product (
    id bigint NOT NULL,
    department_id bigint,
    name character varying(255)
);


ALTER TABLE product OWNER TO grocerylister;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: grocerylister
--

CREATE SEQUENCE product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE product_id_seq OWNER TO grocerylister;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grocerylister
--

ALTER SEQUENCE product_id_seq OWNED BY product.id;


--
-- Name: store; Type: TABLE; Schema: public; Owner: grocerylister; Tablespace:
--

CREATE TABLE store (
    id bigint NOT NULL,
    name character varying(255),
    grocery_list_id bigint NOT NULL
);


ALTER TABLE store OWNER TO grocerylister;

--
-- Name: store_department; Type: TABLE; Schema: public; Owner: grocerylister; Tablespace:
--

CREATE TABLE store_department (
    store_id bigint NOT NULL,
    department_id bigint NOT NULL,
    index integer NOT NULL
);


ALTER TABLE store_department OWNER TO grocerylister;

--
-- Name: store_id_seq; Type: SEQUENCE; Schema: public; Owner: grocerylister
--

CREATE SEQUENCE store_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE store_id_seq OWNER TO grocerylister;

--
-- Name: store_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: grocerylister
--

ALTER SEQUENCE store_id_seq OWNED BY store.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: grocerylister
--

ALTER TABLE ONLY department ALTER COLUMN id SET DEFAULT nextval('department_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: grocerylister
--

ALTER TABLE ONLY grocery_list ALTER COLUMN id SET DEFAULT nextval('grocery_list_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: grocerylister
--

ALTER TABLE ONLY product ALTER COLUMN id SET DEFAULT nextval('product_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: grocerylister
--

ALTER TABLE ONLY store ALTER COLUMN id SET DEFAULT nextval('store_id_seq'::regclass);


--
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: grocerylister
--

COPY department (id, name) FROM stdin;
1	Floral
2	Produce
6	Bread
7	Baking
8	Cereal
12	Condiments
13	Soup
16	Drinks
17	Cookies
18	Crackers
19	Frozen
20	Meat
21	Dairy
22	Health
23	Seasonal
24	Electronics
26	Lamps
38	Wine
39	Rugs
3	Organic Foods
4	Organic Cleaning Supplies
5	Bulk Foods
9	Pet Supplies
11	Paper Products
14	Canned Meat
15	Canned Vegetables
10	Cleaning Supplies
50	Light Bulbs
51	Frozen Entrees
52	Frozen Fruit
53	Frozen Vegetables
54	Frozen Breakfast Food
55	Frozen Breakfast Foods
56	Frozen Potatoes
57	Dry Cereal
58	Hot Cereal
59	Baking Supplies
60	Kitchen Supplies
61	Organic Frozen Foods
62	Jam and Jelly
63	First Aid
64	Fancy Desserts
65	Auto Supplies
66	Paint Supplies
67	Dry Foods
68	Deli
69	Dessert Counter
\.


--
-- Name: department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: grocerylister
--

SELECT pg_catalog.setval('department_id_seq', 69, true);


--
-- Data for Name: grocery_list; Type: TABLE DATA; Schema: public; Owner: grocerylister
--

COPY grocery_list (id, name, last_modified) FROM stdin;
3	Trader Joe's	2016-05-25 08:10:41.094561
2	Fred Meyer	2016-06-14 08:10:41.094561
1	Fred Meyer	2016-06-15 08:10:41.094561
\.


--
-- Name: grocery_list_id_seq; Type: SEQUENCE SET; Schema: public; Owner: grocerylister
--

SELECT pg_catalog.setval('grocery_list_id_seq', 1, false);


--
-- Data for Name: grocery_list_product; Type: TABLE DATA; Schema: public; Owner: grocerylister
--

COPY grocery_list_product (grocery_list_id, product_id) FROM stdin;
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: grocerylister
--

COPY product (id, department_id, name) FROM stdin;
1	2	Carrots
2	2	Pineapple
3	2	Mango
4	2	Salad
5	2	Tomatoes
6	2	Avocado
7	2	Potatoes
8	2	Strawberries
9	2	Raspberries
10	2	Blueberries
11	2	Nectarines
12	2	Peaches
13	6	Whole Wheat Bread
14	6	English Muffins
15	6	Bagels - Plain
16	6	Bagels - Cinnamon Raisin
17	7	Sugar
18	7	Flour
19	7	Brown Sugar
20	7	Powdered Sugar
21	7	PAM
22	7	Cake Mix - Yellow
23	7	Cake Mix - White
24	7	Cake Mix - Chocolate
25	3	Amy's Refried Black Beans
26	3	Amy's Refried Beans with Green Chiles
27	8	Honey Nut Cheerios
28	8	Oatmeal
29	8	Instant Oatmeal - Blueberry
30	8	Instant Oatmeal - Apple Cinnamon
31	8	Instant Oatmeal - Cranberry Almond
32	8	Instant Oatmeal - Cranberry and Blueberry
33	8	Cream of Wheat
34	8	Grits
35	9	Poop Bags
36	10	Dawn dish detergent
37	10	Dishwasher packs
38	10	Chlorox kitchen cleaner
39	10	Toilet bowl cleaner
40	10	Green scrubbies
41	10	Garbage bags
42	11	Paper Towels - Bounty
43	11	Toilet Paper
44	11	Kleenex
45	12	Ketchup
46	12	Mustard
47	12	BBQ Sauce
48	12	Dill pickles - small whole
49	12	Dill pickles - spears
50	12	Dill relish
51	12	Sweet pickles
52	12	Sweet relish
53	12	Mustard relish
54	12	Soy sauce
55	13	Tomato Bisque
56	13	Chicken Broth
57	13	Vegetable Broth
58	13	Beef Broth
59	14	Tuna
60	15	Corn
61	15	Sweet Peas
62	15	Green beans
63	16	Kool-Aid Drink Drops
64	16	Diet Root beer
65	17	Milano
66	18	Club
67	18	Ritz
68	18	Saltines
69	18	Oyster crackers
70	18	Chex Mix
71	19	Ice cream
72	19	Fruit
73	19	Hash browns
74	19	Fries
75	20	Steak
76	20	Ribs
77	20	Chicken
78	20	Turkey
79	20	Bacon
80	20	Sausage
81	21	Butter - Stick
82	21	Butter - Tub
83	21	Cheese
84	21	Milk
85	21	Cream Cheese
86	22	Zyrtec
87	22	Toothpaste
88	22	Floss
89	22	Fiber gummies
90	22	Miralax
91	22	Aveeno Lavender Baby Lotion
102	1	Roses
103	2	Papaya
104	1	Lillies
109	7	Cake Flour
106	7	Coconut Sugar
108	52	Frozen Peaches
\.


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: grocerylister
--

SELECT pg_catalog.setval('product_id_seq', 109, true);


--
-- Data for Name: store; Type: TABLE DATA; Schema: public; Owner: grocerylister
--

COPY store (id, name, grocery_list_id) FROM stdin;
2	Fred Meyer on 82nd	2
3	Trader Joe's	3
1	Fred Meyer on Hawthorne	1
\.


--
-- Data for Name: store_department; Type: TABLE DATA; Schema: public; Owner: grocerylister
--

COPY store_department (store_id, department_id, index) FROM stdin;
1	1	0
2	6	0
2	1	1
2	2	2
2	21	3
2	16	4
2	17	5
2	18	6
2	19	7
2	8	8
2	9	9
2	10	10
2	11	11
2	12	12
2	13	13
2	20	14
2	19	15
2	26	16
2	24	17
3	1	0
3	6	1
3	2	2
3	21	3
3	16	4
3	17	5
3	18	6
3	19	7
3	20	8
3	13	9
3	12	10
3	7	11
3	38	12
1	18	19
1	12	15
1	60	6
1	16	18
1	55	24
1	57	10
1	58	11
1	59	14
1	66	29
1	69	5
1	17	20
1	9	9
1	11	13
1	67	17
1	53	23
1	63	25
1	5	7
1	51	21
1	21	27
1	10	12
1	20	26
1	13	16
1	6	8
1	52	22
1	65	28
1	2	1
1	61	3
1	68	2
1	4	4
\.


--
-- Name: store_id_seq; Type: SEQUENCE SET; Schema: public; Owner: grocerylister
--

SELECT pg_catalog.setval('store_id_seq', 3, true);


--
-- Name: department_name_unique; Type: CONSTRAINT; Schema: public; Owner: grocerylister; Tablespace:
--

ALTER TABLE ONLY department
    ADD CONSTRAINT department_name_unique UNIQUE (name);


--
-- Name: department_pkey; Type: CONSTRAINT; Schema: public; Owner: grocerylister; Tablespace:
--

ALTER TABLE ONLY department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id);


--
-- Name: grocery_list_pkey; Type: CONSTRAINT; Schema: public; Owner: grocerylister; Tablespace:
--

ALTER TABLE ONLY grocery_list
    ADD CONSTRAINT grocery_list_pkey PRIMARY KEY (id);


--
-- Name: product_name_unique; Type: CONSTRAINT; Schema: public; Owner: grocerylister; Tablespace:
--

ALTER TABLE ONLY product
    ADD CONSTRAINT product_name_unique UNIQUE (name);


--
-- Name: product_pkey; Type: CONSTRAINT; Schema: public; Owner: grocerylister; Tablespace:
--

ALTER TABLE ONLY product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: store_pkey; Type: CONSTRAINT; Schema: public; Owner: grocerylister; Tablespace:
--

ALTER TABLE ONLY store
    ADD CONSTRAINT store_pkey PRIMARY KEY (id);


--
-- Name: grocery_list_product_grocery_list_id; Type: FK CONSTRAINT; Schema: public; Owner: grocerylister
--

ALTER TABLE ONLY grocery_list_product
    ADD CONSTRAINT grocery_list_product_grocery_list_id FOREIGN KEY (grocery_list_id) REFERENCES grocery_list(id);


--
-- Name: grocery_list_product_product_id; Type: FK CONSTRAINT; Schema: public; Owner: grocerylister
--

ALTER TABLE ONLY grocery_list_product
    ADD CONSTRAINT grocery_list_product_product_id FOREIGN KEY (product_id) REFERENCES product(id);


--
-- Name: product_department_id; Type: FK CONSTRAINT; Schema: public; Owner: grocerylister
--

ALTER TABLE ONLY product
    ADD CONSTRAINT product_department_id FOREIGN KEY (department_id) REFERENCES department(id);


--
-- Name: store_department_department_id; Type: FK CONSTRAINT; Schema: public; Owner: grocerylister
--

ALTER TABLE ONLY store_department
    ADD CONSTRAINT store_department_department_id FOREIGN KEY (department_id) REFERENCES department(id);


--
-- Name: store_department_store_id; Type: FK CONSTRAINT; Schema: public; Owner: grocerylister
--

ALTER TABLE ONLY store_department
    ADD CONSTRAINT store_department_store_id FOREIGN KEY (store_id) REFERENCES store(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: cjohannsen
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM cjohannsen;
GRANT ALL ON SCHEMA public TO cjohannsen;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
