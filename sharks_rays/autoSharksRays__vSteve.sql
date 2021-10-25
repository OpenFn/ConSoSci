SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_surveytype'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_Surveytype (
    WCSPROGRAMS_SurveytypeID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_SurveytypeName nvarchar(100) NOT NULL,
    WCSPROGRAMS_SurveytypeExtCode nvarchar(100) UNIQUE NOT NULL,
    WCSPROGRAMS_SurveytypeCode nvarchar(255),
    WCSPROGRAMS_SurveytypeDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_Surveytype WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Surveytype_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_Surveytype CHECK CONSTRAINT FK_WCSPROGRAMS_Surveytype_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_Surveytype WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Surveytype_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_Surveytype CHECK CONSTRAINT FK_WCSPROGRAMS_Surveytype_SecuritySettingID_Row;

/* --Use existing WCSPROGRAMS_Region table
 SELECT column_name
 FROM information_schema.columns 
 WHERE table_name = 'wcsprograms_country'
 ORDER BY ordinal_position
 CREATE TABLE WCSPROGRAMS_Country (
 WCSPROGRAMS_CountryID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_CountryName nvarchar(100)    NOT NULL, WCSPROGRAMS_CountryExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_CountryCode nvarchar(255)    , WCSPROGRAMS_CountryDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
 );
 ALTER TABLE WCSPROGRAMS_Country WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Country_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
 REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
 ALTER TABLE WCSPROGRAMS_Country CHECK CONSTRAINT FK_WCSPROGRAMS_Country_OrganizationID_Owner;
 ALTER TABLE WCSPROGRAMS_Country WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Country_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
 REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
 ALTER TABLE WCSPROGRAMS_Country CHECK CONSTRAINT FK_WCSPROGRAMS_Country_SecuritySettingID_Row;
 */
SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_district'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_District (
    WCSPROGRAMS_DistrictID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_DistrictName nvarchar(100) NOT NULL,
    WCSPROGRAMS_DistrictExtCode nvarchar(100) UNIQUE NOT NULL,
    WCSPROGRAMS_DistrictCode nvarchar(255),
    WCSPROGRAMS_DistrictDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_District WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_District_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_District CHECK CONSTRAINT FK_WCSPROGRAMS_District_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_District WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_District_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_District CHECK CONSTRAINT FK_WCSPROGRAMS_District_SecuritySettingID_Row;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_survey'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_Survey (
    WCSPROGRAMS_SurveyID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_SurveyName nvarchar(100) NOT NULL,
    WCSPROGRAMS_SurveyExtCode nvarchar(100) UNIQUE NOT NULL,
    WCSPROGRAMS_SurveyCode nvarchar(255),
    WCSPROGRAMS_SurveyDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_Survey WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Survey_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_Survey CHECK CONSTRAINT FK_WCSPROGRAMS_Survey_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_Survey WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Survey_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_Survey CHECK CONSTRAINT FK_WCSPROGRAMS_Survey_SecuritySettingID_Row;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_site'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_Site (
    WCSPROGRAMS_SiteID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_SiteName nvarchar(100) NOT NULL,
    WCSPROGRAMS_SiteExtCode nvarchar(100) UNIQUE NOT NULL,
    WCSPROGRAMS_SiteCode nvarchar(255),
    WCSPROGRAMS_SiteDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_Site WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Site_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_Site CHECK CONSTRAINT FK_WCSPROGRAMS_Site_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_Site WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Site_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_Site CHECK CONSTRAINT FK_WCSPROGRAMS_Site_SecuritySettingID_Row;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_market'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_Market (
    WCSPROGRAMS_MarketID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_MarketName nvarchar(100) NOT NULL,
    WCSPROGRAMS_MarketExtCode nvarchar(100) UNIQUE NOT NULL,
    WCSPROGRAMS_MarketCode nvarchar(255),
    WCSPROGRAMS_MarketDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_Market WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Market_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_Market CHECK CONSTRAINT FK_WCSPROGRAMS_Market_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_Market WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Market_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_Market CHECK CONSTRAINT FK_WCSPROGRAMS_Market_SecuritySettingID_Row;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_surveyor'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_Surveyor (
    WCSPROGRAMS_SurveyorID int PRIMARY KEY IDENTITY (1, 1),
    WCSPROGRAMS_SurveyorName nvarchar(100),
    WCSPROGRAMS_SurveyorExtCode nvarchar(100) UNIQUE,
    WCSPROGRAMS_SurveyorCode nvarchar(255),
    WCSPROGRAMS_SurveyorDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_Surveyor WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Surveyor_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_Surveyor CHECK CONSTRAINT FK_WCSPROGRAMS_Surveyor_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_Surveyor WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Surveyor_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_Surveyor CHECK CONSTRAINT FK_WCSPROGRAMS_Surveyor_SecuritySettingID_Row;

--Steve to confirm is we keep, or rather use BIT for yes/no
SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_SharksRaysYesNo'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_SharksRaysYesNo (
    WCSPROGRAMS_SharksRaysYesNoID int PRIMARY KEY IDENTITY (1, 1),
    WCSPROGRAMS_SharksRaysYesNoName nvarchar(100),
    WCSPROGRAMS_SharksRaysYesNoExtCode nvarchar(100) UNIQUE,
    WCSPROGRAMS_SharksRaysYesNoCode nvarchar(255),
    WCSPROGRAMS_SharksRaysYesNoDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_SharksRaysYesNo WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysYesNo_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysYesNo CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysYesNo_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_SharksRaysYesNo WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysYesNo_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysYesNo CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysYesNo_SecuritySettingID_Row;

--Yesno still referenced in several places below
SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_boat'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_Boat (
    WCSPROGRAMS_BoatID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_BoatName nvarchar(100) NOT NULL,
    WCSPROGRAMS_BoatExtCode nvarchar(100) UNIQUE NOT NULL,
    WCSPROGRAMS_BoatCode nvarchar(255),
    WCSPROGRAMS_BoatDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_Boat WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Boat_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_Boat CHECK CONSTRAINT FK_WCSPROGRAMS_Boat_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_Boat WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Boat_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_Boat CHECK CONSTRAINT FK_WCSPROGRAMS_Boat_SecuritySettingID_Row;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_gear'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_Gear (
    WCSPROGRAMS_GearID int PRIMARY KEY IDENTITY (1, 1),
    WCSPROGRAMS_GearName nvarchar(100),
    WCSPROGRAMS_GearExtCode nvarchar(100) UNIQUE,
    WCSPROGRAMS_GearCode nvarchar(255),
    WCSPROGRAMS_GearDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_Gear WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Gear_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_Gear CHECK CONSTRAINT FK_WCSPROGRAMS_Gear_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_Gear WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Gear_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_Gear CHECK CONSTRAINT FK_WCSPROGRAMS_Gear_SecuritySettingID_Row;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_unit'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_Unit (
    WCSPROGRAMS_UnitID int PRIMARY KEY IDENTITY (1, 1),
    WCSPROGRAMS_UnitName nvarchar(100),
    WCSPROGRAMS_UnitExtCode nvarchar(100) UNIQUE,
    WCSPROGRAMS_UnitCode nvarchar(255),
    WCSPROGRAMS_UnitDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_Unit WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Unit_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_Unit CHECK CONSTRAINT FK_WCSPROGRAMS_Unit_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_Unit WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Unit_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_Unit CHECK CONSTRAINT FK_WCSPROGRAMS_Unit_SecuritySettingID_Row;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_habitat'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_Habitat (
    WCSPROGRAMS_HabitatID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_HabitatName nvarchar(100) NOT NULL,
    WCSPROGRAMS_HabitatExtCode nvarchar(100) UNIQUE NOT NULL,
    WCSPROGRAMS_HabitatCode nvarchar(255),
    WCSPROGRAMS_HabitatDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_Habitat WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Habitat_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_Habitat CHECK CONSTRAINT FK_WCSPROGRAMS_Habitat_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_Habitat WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Habitat_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_Habitat CHECK CONSTRAINT FK_WCSPROGRAMS_Habitat_SecuritySettingID_Row;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_type'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_Type (
    WCSPROGRAMS_TypeID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_TypeName nvarchar(100) NOT NULL,
    WCSPROGRAMS_TypeExtCode nvarchar(100) UNIQUE NOT NULL,
    WCSPROGRAMS_TypeCode nvarchar(255),
    WCSPROGRAMS_TypeDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_Type WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Type_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_Type CHECK CONSTRAINT FK_WCSPROGRAMS_Type_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_Type WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Type_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_Type CHECK CONSTRAINT FK_WCSPROGRAMS_Type_SecuritySettingID_Row;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_genus'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_Genus (
    WCSPROGRAMS_GenusID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_GenusName nvarchar(100) NOT NULL,
    WCSPROGRAMS_GenusExtCode nvarchar(100) UNIQUE NOT NULL,
    WCSPROGRAMS_GenusCode nvarchar(255),
    WCSPROGRAMS_GenusDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_Genus WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Genus_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_Genus CHECK CONSTRAINT FK_WCSPROGRAMS_Genus_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_Genus WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Genus_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_Genus CHECK CONSTRAINT FK_WCSPROGRAMS_Genus_SecuritySettingID_Row;

/* --Use existing WCSPROGRAMS_Taxa table
 SELECT column_name
 FROM information_schema.columns 
 WHERE table_name = 'wcsprograms_species'
 ORDER BY ordinal_position
 CREATE TABLE WCSPROGRAMS_Species (
 WCSPROGRAMS_SpeciesID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_SpeciesName nvarchar(100)    , WCSPROGRAMS_SpeciesExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_SpeciesCode nvarchar(255)    , WCSPROGRAMS_SpeciesDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
 );
 ALTER TABLE WCSPROGRAMS_Species WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Species_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
 REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
 ALTER TABLE WCSPROGRAMS_Species CHECK CONSTRAINT FK_WCSPROGRAMS_Species_OrganizationID_Owner;
 ALTER TABLE WCSPROGRAMS_Species WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Species_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
 REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
 ALTER TABLE WCSPROGRAMS_Species CHECK CONSTRAINT FK_WCSPROGRAMS_Species_SecuritySettingID_Row;
 */
SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_sex'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_Sex (
    WCSPROGRAMS_SexID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_SexName nvarchar(100) NOT NULL,
    WCSPROGRAMS_SexExtCode nvarchar(100) UNIQUE NOT NULL,
    WCSPROGRAMS_SexCode nvarchar(255),
    WCSPROGRAMS_SexDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_Sex WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Sex_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_Sex CHECK CONSTRAINT FK_WCSPROGRAMS_Sex_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_Sex WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Sex_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_Sex CHECK CONSTRAINT FK_WCSPROGRAMS_Sex_SecuritySettingID_Row;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_fish'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_Fish (
    WCSPROGRAMS_FishID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_FishName nvarchar(100) NOT NULL,
    WCSPROGRAMS_FishExtCode nvarchar(100) UNIQUE NOT NULL,
    WCSPROGRAMS_FishCode nvarchar(255),
    WCSPROGRAMS_FishDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_Fish WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Fish_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_Fish CHECK CONSTRAINT FK_WCSPROGRAMS_Fish_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_Fish WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Fish_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_Fish CHECK CONSTRAINT FK_WCSPROGRAMS_Fish_SecuritySettingID_Row;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_vendor'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_Vendor (
    WCSPROGRAMS_VendorID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_VendorName nvarchar(100) NOT NULL,
    WCSPROGRAMS_VendorExtCode nvarchar(100) UNIQUE NOT NULL,
    WCSPROGRAMS_VendorCode nvarchar(255),
    WCSPROGRAMS_VendorDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_Vendor WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Vendor_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_Vendor CHECK CONSTRAINT FK_WCSPROGRAMS_Vendor_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_Vendor WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_Vendor_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_Vendor CHECK CONSTRAINT FK_WCSPROGRAMS_Vendor_SecuritySettingID_Row;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_kobodataset'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_KoboDataset (
    FormName nvarchar(max),
    DatasetId nvarchar(100) UNIQUE,
    LastUpdated datetime DEFAULT GETDATE(),
    WCSPROGRAMS_KoboDatasetID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_KoboDatasetName nvarchar(255),
    WCSPROGRAMS_KoboDatasetExtCode nvarchar(50) DEFAULT '' NOT NULL,
    WCSPROGRAMS_KoboDatasetCode nvarchar(255),
    WCSPROGRAMS_KoboDatasetDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_KoboDataset WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_KoboDataset_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_KoboDataset CHECK CONSTRAINT FK_WCSPROGRAMS_KoboDataset_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_KoboDataset WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_KoboDataset_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_KoboDataset CHECK CONSTRAINT FK_WCSPROGRAMS_KoboDataset_SecuritySettingID_Row;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_sharksrays'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_SharksRays (
    Verification nvarchar(max),
    SharkRayVendorsNb int NOT NULL,
    Consent nvarchar(max),
    Pic3 nvarchar(max),
    Pic2 nvarchar(max),
    Pic1 nvarchar(max),
    WCSPROGRAMS_SurveyorID_Surveyor int,
    WCSPROGRAMS_MarketID_Market int NOT NULL,
    WCSPROGRAMS_SiteID_LandingSite int NOT NULL,
    WCSPROGRAMS_SurveyID_Survey int NOT NULL,
    WCSPROGRAMS_DistrictID_District int NOT NULL --		, WCSPROGRAMS_CountryID_Country int    NOT NULL
,
    WCSPROGRAMS_RegionID_Country INT NOT NULL,
    Gps nvarchar(max),
    WCSPROGRAMS_SurveytypeID_SurveyType int NOT NULL,
    Deviceid nvarchar(max),
    FormDateEnd date,
    Start date,
    Today date,
    Latitude float,
    Longitude float,
    AnswerId nvarchar(max),
    GeneratedUuid nvarchar(100) UNIQUE,
    Payload nvarchar(max),
    WCSPROGRAMS_SharksRaysID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_SharksRaysName nvarchar(255),
    WCSPROGRAMS_SharksRaysExtCode nvarchar(50) DEFAULT '' NOT NULL,
    WCSPROGRAMS_SharksRaysCode nvarchar(255),
    WCSPROGRAMS_SharksRaysDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_SharksRays WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRays_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_SharksRays WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRays_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_SecuritySettingID_Row;

ALTER TABLE
  WCSPROGRAMS_SharksRays WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_SurveyorID_Surveyor FOREIGN KEY (WCSPROGRAMS_SurveyorID_Surveyor) REFERENCES WCSPROGRAMS_Surveyor (WCSPROGRAMS_SurveyorID);

ALTER TABLE
  WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_SurveyorID_Surveyor;

ALTER TABLE
  WCSPROGRAMS_SharksRays WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_MarketID_Market FOREIGN KEY (WCSPROGRAMS_MarketID_Market) REFERENCES WCSPROGRAMS_Market (WCSPROGRAMS_MarketID);

ALTER TABLE
  WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_MarketID_Market;

ALTER TABLE
  WCSPROGRAMS_SharksRays WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_SiteID_LandingSite FOREIGN KEY (WCSPROGRAMS_SiteID_LandingSite) REFERENCES WCSPROGRAMS_Site (WCSPROGRAMS_SiteID);

ALTER TABLE
  WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_SiteID_LandingSite;

ALTER TABLE
  WCSPROGRAMS_SharksRays WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_SurveyID_Survey FOREIGN KEY (WCSPROGRAMS_SurveyID_Survey) REFERENCES WCSPROGRAMS_Survey (WCSPROGRAMS_SurveyID);

ALTER TABLE
  WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_SurveyID_Survey;

ALTER TABLE
  WCSPROGRAMS_SharksRays WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_DistrictID_District FOREIGN KEY (WCSPROGRAMS_DistrictID_District) REFERENCES WCSPROGRAMS_District (WCSPROGRAMS_DistrictID);

ALTER TABLE
  WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_DistrictID_District;

--ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_CountryID_Country FOREIGN KEY (WCSPROGRAMS_CountryID_Country)
--                      REFERENCES WCSPROGRAMS_Country (WCSPROGRAMS_CountryID);
--                      ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_CountryID_Country;
ALTER TABLE
  WCSPROGRAMS_SharksRays WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_RegionID_Country FOREIGN KEY (WCSPROGRAMS_RegionID_Country) REFERENCES WCSPROGRAMS_Region (WCSPROGRAMS_RegionID);

ALTER TABLE
  WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_RegionID_Country;

ALTER TABLE
  WCSPROGRAMS_SharksRays WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_SurveytypeID_SurveyType FOREIGN KEY (WCSPROGRAMS_SurveytypeID_SurveyType) REFERENCES WCSPROGRAMS_Surveytype (WCSPROGRAMS_SurveytypeID);

ALTER TABLE
  WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_SurveytypeID_SurveyType;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_sharksrayssales'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_SharksRaysSales (
    WCSPROGRAMS_TypeID_SType int NOT NULL,
    WCSPROGRAMS_GenusID_SGenus int NOT NULL --, WCSPROGRAMS_SpeciesID_SSpecies int    
,
    WCSPROGRAMS_TaxaID_Sspecies INT NOT NULL,
    SPic4 nvarchar(max) NOT NULL,
    SPic5 nvarchar(max) NOT NULL,
    SPic6 nvarchar(max) NOT NULL,
    SPic7 nvarchar(max) NOT NULL,
    SPic8 nvarchar(max) NOT NULL,
    SPic9 nvarchar(max) NOT NULL,
    SPic10 nvarchar(max) NOT NULL,
    SPic11 nvarchar(max) NOT NULL,
    SPic12 nvarchar(max),
    SLocalName nvarchar(max) NOT NULL,
    WCSPROGRAMS_SexID_SSex int NOT NULL,
    SWeight float NOT NULL,
    SDiscWidth float NOT NULL,
    SDiscLength float NOT NULL,
    STotalLength float NOT NULL,
    SPrecaudalLength float NOT NULL,
    SForkLength float NOT NULL,
    SCarapaceLength int NOT NULL,
    SCarapaceWidth int NOT NULL,
    SGearType nvarchar(max) NOT NULL,
    SGearTypeOther nvarchar(max) NOT NULL,
    WCSPROGRAMS_SharksRaysYesNoID_SDnaSampleCollected int NOT NULL --,SDnaSampleCollected BIT NOT NULL
,
    SDnaCode nvarchar(max) NOT NULL,
    SPriceSoldFor int NOT NULL,
    SPriceSoldUsd nvarchar(100),
    SComment nvarchar(max),
    VendorUuid nvarchar(max),
    AnswerId nvarchar(max),
    GeneratedUuid nvarchar(100) UNIQUE,
    WCSPROGRAMS_SharksRaysID int,
    WCSPROGRAMS_SalesID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_SalesName nvarchar(255),
    WCSPROGRAMS_SalesExtCode nvarchar(50) DEFAULT '' NOT NULL,
    WCSPROGRAMS_SalesCode nvarchar(255),
    WCSPROGRAMS_SalesDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_SharksRaysSales WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_SharksRaysSales WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_SecuritySettingID_Row;

ALTER TABLE
  WCSPROGRAMS_SharksRaysSales WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID) REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SharksRaysID;

ALTER TABLE
  WCSPROGRAMS_SharksRaysSales WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_TypeID_SType FOREIGN KEY (WCSPROGRAMS_TypeID_SType) REFERENCES WCSPROGRAMS_Type (WCSPROGRAMS_TypeID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_TypeID_SType;

ALTER TABLE
  WCSPROGRAMS_SharksRaysSales WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_GenusID_SGenus FOREIGN KEY (WCSPROGRAMS_GenusID_SGenus) REFERENCES WCSPROGRAMS_Genus (WCSPROGRAMS_GenusID);

--                      ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_GenusID_SGenus;
--ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SpeciesID_SSpecies FOREIGN KEY (WCSPROGRAMS_SpeciesID_SSpecies)
--                      REFERENCES WCSPROGRAMS_Species (WCSPROGRAMS_SpeciesID);
--                      ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SpeciesID_SSpecies;
ALTER TABLE
  WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_GenusID_SGenus;

ALTER TABLE
  WCSPROGRAMS_SharksRaysSales WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_TaxaID_SSpecies FOREIGN KEY (WCSPROGRAMS_TaxaID_SSpecies) REFERENCES WCSPROGRAMS_Taxa (WCSPROGRAMS_TaxaID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_TaxaID_SSpecies;

ALTER TABLE
  WCSPROGRAMS_SharksRaysSales WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SexID_SSex FOREIGN KEY (WCSPROGRAMS_SexID_SSex) REFERENCES WCSPROGRAMS_Sex (WCSPROGRAMS_SexID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SexID_SSex;

ALTER TABLE
  WCSPROGRAMS_SharksRaysSales WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SharksRaysYesNoID_SDnaSampleCollected FOREIGN KEY (
    WCSPROGRAMS_SharksRaysYesNoID_SDnaSampleCollected
  ) REFERENCES WCSPROGRAMS_SharksRaysYesNo (WCSPROGRAMS_SharksRaysYesNoID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SharksRaysYesNoID_SDnaSampleCollected;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_sharksraysvendor'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_SharksRaysVendor (
    WCSPROGRAMS_SexID_VendorSex int NOT NULL,
    WhenLastSellSharkRay nvarchar(max) NOT NULL,
    WCSPROGRAMS_VendorID_WhereBought int NOT NULL,
    WCSPROGRAMS_VendorID_WhoSoldTo int NOT NULL,
    WhoSoldOther nvarchar(max) NOT NULL,
    SharksraysUuid nvarchar(max),
    AnswerId nvarchar(max),
    GeneratedUuid nvarchar(100) UNIQUE,
    WCSPROGRAMS_SharksRaysID int,
    WCSPROGRAMS_VendorID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_VendorName nvarchar(255),
    WCSPROGRAMS_VendorExtCode nvarchar(50) DEFAULT '' NOT NULL,
    WCSPROGRAMS_VendorCode nvarchar(255),
    WCSPROGRAMS_VendorDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_SharksRaysVendor WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_SharksRaysVendor WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_SecuritySettingID_Row;

ALTER TABLE
  WCSPROGRAMS_SharksRaysVendor WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID) REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_SharksRaysID;

ALTER TABLE
  WCSPROGRAMS_SharksRaysVendor WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_SexID_VendorSex FOREIGN KEY (WCSPROGRAMS_SexID_VendorSex) REFERENCES WCSPROGRAMS_Sex (WCSPROGRAMS_SexID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_SexID_VendorSex;

ALTER TABLE
  WCSPROGRAMS_SharksRaysVendor WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_VendorID_WhereBought FOREIGN KEY (WCSPROGRAMS_VendorID_WhereBought) REFERENCES WCSPROGRAMS_Vendor (WCSPROGRAMS_VendorID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_VendorID_WhereBought;

ALTER TABLE
  WCSPROGRAMS_SharksRaysVendor WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_VendorID_WhoSoldTo FOREIGN KEY (WCSPROGRAMS_VendorID_WhoSoldTo) REFERENCES WCSPROGRAMS_Vendor (WCSPROGRAMS_VendorID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_VendorID_WhoSoldTo;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_sharksrayssample'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_SharksRaysSample (
    FishLength float,
    FishWeight float,
    FishCatchUuid nvarchar(max),
    AnswerId nvarchar(max),
    GeneratedUuid nvarchar(100) UNIQUE,
    WCSPROGRAMS_SharksRaysID int,
    WCSPROGRAMS_SampleID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_SampleName nvarchar(255),
    WCSPROGRAMS_SampleExtCode nvarchar(50) DEFAULT '' NOT NULL,
    WCSPROGRAMS_SampleCode nvarchar(255),
    WCSPROGRAMS_SampleDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_SharksRaysSample WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysSample CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_SharksRaysSample WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysSample CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_SecuritySettingID_Row;

ALTER TABLE
  WCSPROGRAMS_SharksRaysSample WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID) REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysSample CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_WCSPROGRAMS_SharksRaysID;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_sharksraysfishcatch'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_SharksRaysFishCatch (
    WCSPROGRAMS_FishID_FishSpecie int NOT NULL,
    NbObserved int NOT NULL,
    TotalWeightFish int NOT NULL,
    FishPartConsumed int NOT NULL,
    FishPriceKg int NOT NULL,
    FishPriceSoldUsd nvarchar(100),
    BoatUuid nvarchar(max),
    AnswerId nvarchar(max),
    GeneratedUuid nvarchar(100) UNIQUE,
    WCSPROGRAMS_SharksRaysID int,
    WCSPROGRAMS_FishCatchID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_FishCatchName nvarchar(255),
    WCSPROGRAMS_FishCatchExtCode nvarchar(50) DEFAULT '' NOT NULL,
    WCSPROGRAMS_FishCatchCode nvarchar(255),
    WCSPROGRAMS_FishCatchDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_SharksRaysFishCatch WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysFishCatch CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_SharksRaysFishCatch WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysFishCatch CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_SecuritySettingID_Row;

ALTER TABLE
  WCSPROGRAMS_SharksRaysFishCatch WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID) REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysFishCatch CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_WCSPROGRAMS_SharksRaysID;

ALTER TABLE
  WCSPROGRAMS_SharksRaysFishCatch WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_WCSPROGRAMS_FishID_FishSpecie FOREIGN KEY (WCSPROGRAMS_FishID_FishSpecie) REFERENCES WCSPROGRAMS_Fish (WCSPROGRAMS_FishID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysFishCatch CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_WCSPROGRAMS_FishID_FishSpecie;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_sharksrayscatchdetails'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_SharksRaysCatchDetails (
    WCSPROGRAMS_TypeID_Type int NOT NULL,
    WCSPROGRAMS_GenusID_Genus int NOT NULL --, WCSPROGRAMS_SpecieID_Species int    
,
    WCSPROGRAMS_TaxaID_Species INT NOT NULL,
    LocalName nvarchar(max) NOT NULL,
    WCSPROGRAMS_SexID_Sex int NOT NULL,
    Weight float NOT NULL,
    DiscWidth float NOT NULL,
    DiscLength float NOT NULL,
    TotalLength float NOT NULL,
    ForkLength float NOT NULL,
    PrecaudalLength float NOT NULL,
    Pic4 nvarchar(max) NOT NULL,
    Pic5 nvarchar(max) NOT NULL,
    Pic6 nvarchar(max) NOT NULL,
    Pic7 nvarchar(max) NOT NULL,
    Pic8 nvarchar(max) NOT NULL,
    Pic9 nvarchar(max) NOT NULL,
    Pic10 nvarchar(max),
    Pic11 nvarchar(max),
    Pic12 nvarchar(max),
    GearType nvarchar(max) NOT NULL,
    GearTypeOther nvarchar(max) NOT NULL,
    WCSPROGRAMS_SharksRaysYesNoID_DnaSampleCollected int NOT NULL --,DnaSampleCollected BIT NOT NULL
,
    DnaCode nvarchar(max) NOT NULL,
    PriceSoldFor int NOT NULL,
    PriceSoldUsd nvarchar(100),
    Comment nvarchar(max),
    BoatUuid nvarchar(max),
    AnswerId nvarchar(max),
    GeneratedUuid nvarchar(100) UNIQUE,
    WCSPROGRAMS_SharksRaysID int,
    WCSPROGRAMS_CatchDetailsID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_CatchDetailsName nvarchar(255),
    WCSPROGRAMS_CatchDetailsExtCode nvarchar(50) DEFAULT '' NOT NULL,
    WCSPROGRAMS_CatchDetailsCode nvarchar(255),
    WCSPROGRAMS_CatchDetailsDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_SecuritySettingID_Row;

ALTER TABLE
  WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID) REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_SharksRaysID;

ALTER TABLE
  WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_TypeID_Type FOREIGN KEY (WCSPROGRAMS_TypeID_Type) REFERENCES WCSPROGRAMS_Type (WCSPROGRAMS_TypeID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_TypeID_Type;

ALTER TABLE
  WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_GenusID_Genus FOREIGN KEY (WCSPROGRAMS_GenusID_Genus) REFERENCES WCSPROGRAMS_Genus (WCSPROGRAMS_GenusID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_GenusID_Genus;

--ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_SpeciesID_Species FOREIGN KEY (WCSPROGRAMS_SpeciesID_Species)
--                      REFERENCES WCSPROGRAMS_Species (WCSPROGRAMS_SpeciesID);
--                      ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_SpeciesID_Species;
ALTER TABLE
  WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_TaxaID_Species FOREIGN KEY (WCSPROGRAMS_TaxaID_Species) REFERENCES WCSPROGRAMS_Taxa (WCSPROGRAMS_TaxaID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_TaxaID_Species;

ALTER TABLE
  WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_SexID_Sex FOREIGN KEY (WCSPROGRAMS_SexID_Sex) REFERENCES WCSPROGRAMS_Sex (WCSPROGRAMS_SexID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_SexID_Sex;

ALTER TABLE
  WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_SharksRaysYesNoID_DnaSampleCollected FOREIGN KEY (WCSPROGRAMS_SharksRaysYesNoID_DnaSampleCollected) REFERENCES WCSPROGRAMS_SharksRaysYesNo (WCSPROGRAMS_SharksRaysYesNoID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_SharksRaysYesNoID_DnaSampleCollected;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_sharksraysboat'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_SharksRaysBoat (
    WCSPROGRAMS_SharksRaysYesNoID_BoatInfo int,
    WCSPROGRAMS_BoatID_BoatType int NOT NULL,
    OtherBoat nvarchar(max) NOT NULL,
    Crew int NOT NULL,
    WomenCrew int NOT NULL,
    Engine int NOT NULL,
    WCSPROGRAMS_GearID_PrimaryGear int,
    PrimaryNetType nvarchar(max) NOT NULL,
    PrimaryLineType nvarchar(max) NOT NULL,
    PrimaryOtherType nvarchar(max) NOT NULL,
    PrimaryGearLocalName nvarchar(max) NOT NULL,
    PrimaryNetLength int NOT NULL,
    PrimaryNetHeight int NOT NULL,
    PrimaryMeshSize int NOT NULL,
    WCSPROGRAMS_UnitID_PrimaryMeshSizeUnit int,
    PrimaryLinesNb int NOT NULL,
    PrimaryHooksNb int NOT NULL,
    PrimaryHookSize nvarchar(max) NOT NULL,
    WCSPROGRAMS_GearID_SecondaryGear int,
    SecondaryNetType nvarchar(max) NOT NULL,
    SecondaryLineType nvarchar(max) NOT NULL,
    SecondaryOtherType nvarchar(max) NOT NULL,
    SecondaryGearLocalName nvarchar(max) NOT NULL,
    SecondaryNetLength int NOT NULL,
    SecondaryNetHeight int NOT NULL,
    SecondaryMeshSize int NOT NULL,
    WCSPROGRAMS_UnitID_SecondaryMeshSizeUnit int,
    SecondaryLinesNb int NOT NULL,
    SecondaryHooksNb int NOT NULL,
    SecondaryHookSize nvarchar(max) NOT NULL,
    FishingLocation nvarchar(max) NOT NULL,
    FishingDepth int NOT NULL,
    WCSPROGRAMS_HabitatID_FishingHabitat int NOT NULL,
    OtherHabitat nvarchar(max) NOT NULL,
    DistanceSite nvarchar(max) NOT NULL,
    FishingStart nvarchar(max),
    FishingEnd nvarchar(max),
    FishingTime int,
    TravelTime int NOT NULL,
    NbBoats int NOT NULL,
    WCSPROGRAMS_SharksRaysYesNoID_Targeted int NOT NULL,
    LastCatchSharkRay nvarchar(max) NOT NULL,
    WCSPROGRAMS_SharksRaysYesNoID_ReleaseSharkRay int NOT NULL,
    PercentEat int NOT NULL,
    PercentSell int NOT NULL,
    PercentGive int NOT NULL,
    WhereSellFins nvarchar(max) NOT NULL,
    WhereSellMeat nvarchar(max) NOT NULL,
    WhereSellOil nvarchar(max) NOT NULL,
    FinsPrice int NOT NULL,
    FinsPriceUsd nvarchar(100),
    MeatPrice int NOT NULL,
    MeatPriceUsd nvarchar(100),
    OilPrice int NOT NULL,
    OilPriceUsd nvarchar(100),
    NbSharksUnsampled int NOT NULL,
    NbRaysUnsampled int NOT NULL,
    NbSharkLikeRaysUnsampled int NOT NULL,
    SharksraysUuid nvarchar(max),
    AnswerId nvarchar(max),
    GeneratedUuid nvarchar(100) UNIQUE,
    WCSPROGRAMS_SharksRaysID int,
    WCSPROGRAMS_BoatID int PRIMARY KEY IDENTITY (1, 1) NOT NULL,
    WCSPROGRAMS_BoatName nvarchar(255),
    WCSPROGRAMS_BoatExtCode nvarchar(50) DEFAULT '' NOT NULL,
    WCSPROGRAMS_BoatCode nvarchar(255),
    WCSPROGRAMS_BoatDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_SecuritySettingID_Row;

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID) REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_SharksRaysID;

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_SharksRaysYesNoID_BoatInfo FOREIGN KEY (WCSPROGRAMS_SharksRaysYesNoID_BoatInfo) REFERENCES WCSPROGRAMS_SharksRaysYesNo (WCSPROGRAMS_SharksRaysYesNoID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_SharksRaysYesNoID_BoatInfo;

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_BoatID_BoatType FOREIGN KEY (WCSPROGRAMS_BoatID_BoatType) REFERENCES WCSPROGRAMS_Boat (WCSPROGRAMS_BoatID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_BoatID_BoatType;

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_GearID_PrimaryGear FOREIGN KEY (WCSPROGRAMS_GearID_PrimaryGear) REFERENCES WCSPROGRAMS_Gear (WCSPROGRAMS_GearID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_GearID_PrimaryGear;

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_UnitID_PrimaryMeshSizeUnit FOREIGN KEY (WCSPROGRAMS_UnitID_PrimaryMeshSizeUnit) REFERENCES WCSPROGRAMS_Unit (WCSPROGRAMS_UnitID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_UnitID_PrimaryMeshSizeUnit;

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_GearID_SecondaryGear FOREIGN KEY (WCSPROGRAMS_GearID_SecondaryGear) REFERENCES WCSPROGRAMS_Gear (WCSPROGRAMS_GearID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_GearID_SecondaryGear;

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_UnitID_SecondaryMeshSizeUnit FOREIGN KEY (WCSPROGRAMS_UnitID_SecondaryMeshSizeUnit) REFERENCES WCSPROGRAMS_Unit (WCSPROGRAMS_UnitID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_UnitID_SecondaryMeshSizeUnit;

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_HabitatID_FishingHabitat FOREIGN KEY (WCSPROGRAMS_HabitatID_FishingHabitat) REFERENCES WCSPROGRAMS_Habitat (WCSPROGRAMS_HabitatID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_HabitatID_FishingHabitat;

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_SharksRaysYesNoID_Targeted FOREIGN KEY (WCSPROGRAMS_SharksRaysYesNoID_Targeted) REFERENCES WCSPROGRAMS_SharksRaysYesNo (WCSPROGRAMS_SharksRaysYesNoID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_SharksRaysYesNoID_Targeted;

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_SharksRaysYesNoID_ReleaseSharkRay FOREIGN KEY (WCSPROGRAMS_SharksRaysYesNoID_ReleaseSharkRay) REFERENCES WCSPROGRAMS_SharksRaysYesNo (WWCSPROGRAMS_SharksRaysYesNoID);

ALTER TABLE
  WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_SharksRaysYesNoID_ReleaseSharkRay;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_salesgear'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_SalesGear (
    WCSPROGRAMS_GearID int NOT NULL,
    WCSPROGRAMS_SalesID int NOT NULL,
    WCSPROGRAMS_SGearTypeName nvarchar(255),
    WCSPROGRAMS_SGearTypeExtCode nvarchar(50) DEFAULT '' NOT NULL,
    WCSPROGRAMS_SGearTypeCode nvarchar(255),
    WCSPROGRAMS_SGearTypeDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_SalesGear WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SalesGear_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_SalesGear CHECK CONSTRAINT FK_WCSPROGRAMS_SalesGear_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_SalesGear WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SalesGear_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_SalesGear CHECK CONSTRAINT FK_WCSPROGRAMS_SalesGear_SecuritySettingID_Row;

ALTER TABLE
  WCSPROGRAMS_SalesGear WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SalesGear_WCSPROGRAMS_GearID FOREIGN KEY (WCSPROGRAMS_GearID) REFERENCES WCSPROGRAMS_Gear (WCSPROGRAMS_GearID);

ALTER TABLE
  WCSPROGRAMS_SalesGear CHECK CONSTRAINT FK_WCSPROGRAMS_SalesGear_WCSPROGRAMS_GearID;

ALTER TABLE
  WCSPROGRAMS_SalesGear WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_SalesGear_WCSPROGRAMS_SalesID FOREIGN KEY (WCSPROGRAMS_SalesID) REFERENCES WCSPROGRAMS_SharksRaysSales (WCSPROGRAMS_SalesID);

ALTER TABLE
  WCSPROGRAMS_SalesGear CHECK CONSTRAINT FK_WCSPROGRAMS_SalesGear_WCSPROGRAMS_SalesID;

SELECT
  column_name
FROM
  information_schema.columns
WHERE
  table_name = 'wcsprograms_catchdetailsgear'
ORDER BY
  ordinal_position CREATE TABLE WCSPROGRAMS_CatchDetailsGear (
    WCSPROGRAMS_GearID int NOT NULL,
    WCSPROGRAMS_CatchDetailsID int NOT NULL,
    WCSPROGRAMS_GearTypeName nvarchar(255),
    WCSPROGRAMS_GearTypeExtCode nvarchar(50) DEFAULT '' NOT NULL,
    WCSPROGRAMS_GearTypeCode nvarchar(255),
    WCSPROGRAMS_GearTypeDescription nvarchar(255),
    WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1 NOT NULL,
    WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1 NOT NULL,
    Archive BIT DEFAULT 0 NOT NULL,
    IsPublic BIT DEFAULT 0 NOT NULL,
    CRDate datetime DEFAULT GETDATE() NOT NULL,
    LMDate datetime DEFAULT GETDATE() NOT NULL,
    UserID_CR int DEFAULT -1 NOT NULL,
    UserID_LM int DEFAULT -1 NOT NULL,
    CRIPAddress nvarchar(32) DEFAULT '' NOT NULL,
    LMIPAddress nvarchar(32) DEFAULT '' NOT NULL
  );

ALTER TABLE
  WCSPROGRAMS_CatchDetailsGear WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGear_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner) REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);

ALTER TABLE
  WCSPROGRAMS_CatchDetailsGear CHECK CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGear_OrganizationID_Owner;

ALTER TABLE
  WCSPROGRAMS_CatchDetailsGear WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGear_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row) REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);

ALTER TABLE
  WCSPROGRAMS_CatchDetailsGear CHECK CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGear_SecuritySettingID_Row;

ALTER TABLE
  WCSPROGRAMS_CatchDetailsGear WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGear_WCSPROGRAMS_GearID FOREIGN KEY (WCSPROGRAMS_GearID) REFERENCES WCSPROGRAMS_Gear (WCSPROGRAMS_GearID);

ALTER TABLE
  WCSPROGRAMS_CatchDetailsGear CHECK CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGear_WCSPROGRAMS_GearID;

ALTER TABLE
  WCSPROGRAMS_CatchDetailsGear WITH CHECK
ADD
  CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGear_WCSPROGRAMS_CatchDetailsID FOREIGN KEY (WCSPROGRAMS_CatchDetailsID) REFERENCES WCSPROGRAMS_SharksRaysCatchDetails (WCSPROGRAMS_CatchDetailsID);

ALTER TABLE
  WCSPROGRAMS_CatchDetailsGear CHECK CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGear_WCSPROGRAMS_CatchDetailsID;

MERGE WCSPROGRAMS_Surveytype AS [Target] USING (
  VALUES
    ('real', 'real'),
    ('practice', 'practice')
) AS [Source] (
  WCSPROGRAMS_SurveytypeExtCode,
  WCSPROGRAMS_SurveytypeName
) ON [Target].WCSPROGRAMS_SurveytypeExtCode = [Source].WCSPROGRAMS_SurveytypeExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_SurveytypeExtCode = [Source].WCSPROGRAMS_SurveytypeExtCode,
  [Target].WCSPROGRAMS_SurveytypeName = [Source].WCSPROGRAMS_SurveytypeName
  WHEN NOT MATCHED THEN
INSERT
  (
    WCSPROGRAMS_SurveytypeExtCode,
    WCSPROGRAMS_SurveytypeName
  )
VALUES
  (
    [Source].WCSPROGRAMS_SurveytypeExtCode,
    [Source].WCSPROGRAMS_SurveytypeName
  );

-- MERGE WCSPROGRAMS_Country AS [Target]
--         USING (VALUES ('kenya', 'kenya'), ('madagascar', 'madagascar'), ('mozambique', 'mozambique'), ('tanzania', 'tanzania')) AS [Source] (WCSPROGRAMS_CountryExtCode, WCSPROGRAMS_CountryName)
--         ON [Target].WCSPROGRAMS_CountryExtCode = [Source].WCSPROGRAMS_CountryExtCode
--         WHEN MATCHED THEN
--           UPDATE SET [Target].WCSPROGRAMS_CountryExtCode=[Source].WCSPROGRAMS_CountryExtCode, [Target].WCSPROGRAMS_CountryName=[Source].WCSPROGRAMS_CountryName
--         WHEN NOT MATCHED THEN
--           INSERT (WCSPROGRAMS_CountryExtCode, WCSPROGRAMS_CountryName) VALUES ([Source].WCSPROGRAMS_CountryExtCode, [Source].WCSPROGRAMS_CountryName);
MERGE WCSPROGRAMS_District AS [Target] USING (
  VALUES
    ('kilifi', 'kilifi'),
    ('kwale', 'kwale'),
    ('lamu', 'lamu'),
    ('mombasa', 'mombasa'),
    ('tana_river', 'tana_river'),
    ('antongil_bay', 'antongil_bay'),
    ('nosy_be', 'nosy_be'),
    ('toliara', 'toliara'),
    ('cabo_delgado', 'cabo_delgado'),
    ('maputo', 'maputo'),
    ('nampula', 'nampula'),
    ('sofala', 'sofala'),
    ('zambezia', 'zambezia'),
    ('kilwa', 'kilwa'),
    ('mafia', 'mafia'),
    ('mtwara', 'mtwara'),
    ('pemba', 'pemba'),
    ('rufiji', 'rufiji'),
    ('tanga', 'tanga'),
    ('unguja', 'unguja')
) AS [Source] (
  WCSPROGRAMS_DistrictExtCode,
  WCSPROGRAMS_DistrictName
) ON [Target].WCSPROGRAMS_DistrictExtCode = [Source].WCSPROGRAMS_DistrictExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_DistrictExtCode = [Source].WCSPROGRAMS_DistrictExtCode,
  [Target].WCSPROGRAMS_DistrictName = [Source].WCSPROGRAMS_DistrictName
  WHEN NOT MATCHED THEN
INSERT
  (
    WCSPROGRAMS_DistrictExtCode,
    WCSPROGRAMS_DistrictName
  )
VALUES
  (
    [Source].WCSPROGRAMS_DistrictExtCode,
    [Source].WCSPROGRAMS_DistrictName
  );

MERGE WCSPROGRAMS_Survey AS [Target] USING (
  VALUES
    ('landing_site', 'landing_site'),
    ('market', 'market')
) AS [Source] (
  WCSPROGRAMS_SurveyExtCode,
  WCSPROGRAMS_SurveyName
) ON [Target].WCSPROGRAMS_SurveyExtCode = [Source].WCSPROGRAMS_SurveyExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_SurveyExtCode = [Source].WCSPROGRAMS_SurveyExtCode,
  [Target].WCSPROGRAMS_SurveyName = [Source].WCSPROGRAMS_SurveyName
  WHEN NOT MATCHED THEN
INSERT
  (
    WCSPROGRAMS_SurveyExtCode,
    WCSPROGRAMS_SurveyName
  )
VALUES
  (
    [Source].WCSPROGRAMS_SurveyExtCode,
    [Source].WCSPROGRAMS_SurveyName
  );

MERGE WCSPROGRAMS_Site AS [Target] USING (
  VALUES
    ('analanjahana', 'analanjahana'),
    ('androkaroka', 'androkaroka'),
    ('anove', 'anove'),
    ('antanambe', 'antanambe'),
    ('imorona', 'imorona'),
    ('mandrisy', 'mandrisy'),
    ('tampolo', 'tampolo'),
    ('mecufi', 'mecufi'),
    ('nanhibe', 'nanhibe'),
    ('paquite', 'paquite'),
    ('ngomeni', 'ngomeni'),
    ('somanga', 'somanga'),
    ('jimbo', 'jimbo'),
    ('vanga', 'vanga'),
    ('kiwayuu_cha_inde', 'kiwayuu_cha_inde'),
    ('kiwayuu_cha_ndani', 'kiwayuu_cha_ndani'),
    ('mafia', 'mafia'),
    ('bairro_pescadores', 'bairro_pescadores'),
    ('shangani', 'shangani'),
    ('angoche', 'angoche'),
    ('larde', 'larde'),
    ('moma', 'moma'),
    ('ambaliabe', 'ambaliabe'),
    ('ampasimena', 'ampasimena'),
    ('amporaha', 'amporaha'),
    ('andavakabiby', 'andavakabiby'),
    ('bevaoko', 'bevaoko'),
    ('mangirankirana', 'mangirankirana'),
    ('marimbe', 'marimbe'),
    ('marotogny', 'marotogny'),
    ('nosy_iranja', 'nosy_iranja'),
    ('ratapenjika', 'ratapenjika'),
    ('kukuu', 'kukuu'),
    ('macaneta', 'macaneta'),
    ('msuka', 'msuka'),
    ('wete', 'wete'),
    ('sumbauranga', 'sumbauranga'),
    ('sofala', 'sofala'),
    ('kipini', 'kipini'),
    ('tanga', 'tanga'),
    ('andravona', 'andravona'),
    ('salary', 'salary'),
    ('tsandamba', 'tsandamba'),
    ('bwawani', 'bwawani'),
    ('kizimkazi_dimbani', 'kizimkazi_dimbani'),
    ('mazizini', 'mazizini'),
    ('mkokotoni', 'mkokotoni'),
    ('nungwi', 'nungwi'),
    ('pebane', 'pebane'),
    ('zalala', 'zalala')
) AS [Source] (WCSPROGRAMS_SiteExtCode, WCSPROGRAMS_SiteName) ON [Target].WCSPROGRAMS_SiteExtCode = [Source].WCSPROGRAMS_SiteExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_SiteExtCode = [Source].WCSPROGRAMS_SiteExtCode,
  [Target].WCSPROGRAMS_SiteName = [Source].WCSPROGRAMS_SiteName
  WHEN NOT MATCHED THEN
INSERT
  (WCSPROGRAMS_SiteExtCode, WCSPROGRAMS_SiteName)
VALUES
  (
    [Source].WCSPROGRAMS_SiteExtCode,
    [Source].WCSPROGRAMS_SiteName
  );

MERGE WCSPROGRAMS_Market AS [Target] USING (
  VALUES
    ('antanambe', 'antanambe'),
    ('manambolosy', 'manambolosy'),
    ('maroantsetra', 'maroantsetra'),
    ('rantabe', 'rantabe'),
    ('bairro_dos_pescadores', 'bairro_dos_pescadores'),
    ('ferry', 'ferry'),
    ('old_town', 'old_town'),
    ('angoche', 'angoche'),
    (
      'bazarikely_andavakatokoko',
      'bazarikely_andavakatokoko'
    ),
    ('daresalama', 'daresalama'),
    ('dzamandzary', 'dzamandzary'),
    ('la_batterie', 'la_batterie'),
    ('port_ambarovato', 'port_ambarovato'),
    ('port_saint_louis', 'port_saint_louis'),
    ('chole', 'chole'),
    ('mkoani', 'mkoani'),
    ('andravona', 'andravona'),
    ('salary', 'salary'),
    ('tsandamba', 'tsandamba'),
    ('pebane', 'pebane'),
    ('zalala', 'zalala')
) AS [Source] (
  WCSPROGRAMS_MarketExtCode,
  WCSPROGRAMS_MarketName
) ON [Target].WCSPROGRAMS_MarketExtCode = [Source].WCSPROGRAMS_MarketExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_MarketExtCode = [Source].WCSPROGRAMS_MarketExtCode,
  [Target].WCSPROGRAMS_MarketName = [Source].WCSPROGRAMS_MarketName
  WHEN NOT MATCHED THEN
INSERT
  (
    WCSPROGRAMS_MarketExtCode,
    WCSPROGRAMS_MarketName
  )
VALUES
  (
    [Source].WCSPROGRAMS_MarketExtCode,
    [Source].WCSPROGRAMS_MarketName
  );

MERGE WCSPROGRAMS_Surveyor AS [Target] USING (
  VALUES
    ('abass_othman_mshenga', 'abass_othman_mshenga'),
    ('abdi_omar', 'abdi_omar'),
    ('adu_tiro_bahero', 'adu_tiro_bahero'),
    ('ame_sikiani_juma', 'ame_sikiani_juma'),
    ('carlos_verao', 'carlos_verao'),
    ('elvina_nyale', 'elvina_nyale'),
    ('eurico_morais', 'eurico_morais'),
    ('faki_haji_faki', 'faki_haji_faki'),
    ('faruque_joaquim', 'faruque_joaquim'),
    ('fraz�o_omar', 'fraz�o_omar'),
    ('habiba_muss�', 'habiba_muss�'),
    ('habibu_nassor_mpande', 'habibu_nassor_mpande'),
    ('jorge_sitoe', 'jorge_sitoe'),
    ('naseeba_sidat', 'naseeba_sidat'),
    ('maryam_issa_nassor', 'maryam_issa_nassor'),
    ('masoud_rashid_masoud', 'masoud_rashid_masoud'),
    ('mwakiraa_mohamed', 'mwakiraa_mohamed'),
    ('mwambwiza_mwangombe', 'mwambwiza_mwangombe'),
    ('omar_said_omar', 'omar_said_omar'),
    ('paschal_peter_mgalu', 'paschal_peter_mgalu'),
    ('semo_mapai', 'semo_mapai'),
    ('shee_bwana_heri', 'shee_bwana_heri'),
    ('sijali_kipuli', 'sijali_kipuli'),
    (
      'sulemani_masoud_mohamedi',
      'sulemani_masoud_mohamedi'
    ),
    ('ummi_ally_masoud', 'ummi_ally_masoud'),
    ('ummu_badiri_lali', 'ummu_badiri_lali'),
    ('yakoub_ali_ayoub', 'yakoub_ali_ayoub'),
    ('yussuf_abdalla_khatib', 'yussuf_abdalla_khatib'),
    ('achraf', 'achraf'),
    ('adeline', 'adeline'),
    ('adrien', 'adrien'),
    ('albert', 'albert'),
    ('alin', 'alin'),
    ('alvine', 'alvine'),
    ('amady', 'amady'),
    ('amorose', 'amorose'),
    ('ampizara', 'ampizara'),
    ('angelicia', 'angelicia'),
    ('angeline', 'angeline'),
    ('anita', 'anita'),
    ('assany', 'assany'),
    ('atomany', 'atomany'),
    ('aurelie', 'aurelie'),
    ('bartiere', 'bartiere'),
    ('besomainy', 'besomainy'),
    ('celestine', 'celestine'),
    ('charles', 'charles'),
    ('dady', 'dady'),
    ('danio', 'danio'),
    ('elizabeth', 'elizabeth'),
    ('fabiola', 'fabiola'),
    ('falay', 'falay'),
    ('felizia', 'felizia'),
    ('fonena', 'fonena'),
    ('gilbert', 'gilbert'),
    ('henriette', 'henriette'),
    ('ir�ne', 'ir�ne'),
    ('jaoriziky', 'jaoriziky'),
    ('jean_marc', 'jean_marc'),
    ('jenny', 'jenny'),
    ('jocellah', 'jocellah'),
    ('kamardine', 'kamardine'),
    ('leticia', 'leticia'),
    ('levita', 'levita'),
    ('lirpa', 'lirpa'),
    ('louisette', 'louisette'),
    ('mahamodo', 'mahamodo'),
    ('mariana', 'mariana'),
    ('mariette', 'mariette'),
    ('mario', 'mario'),
    ('maxime', 'maxime'),
    ('milien', 'milien'),
    ('nania', 'nania'),
    ('oberge', 'oberge'),
    ('odilon', 'odilon'),
    ('olga', 'olga'),
    ('pascaline', 'pascaline'),
    ('randria', 'randria'),
    ('raphael', 'raphael'),
    ('reddia', 'reddia'),
    ('rosette', 'rosette'),
    ('said', 'said'),
    ('sandra', 'sandra'),
    ('sanora', 'sanora'),
    ('soalazy', 'soalazy'),
    ('solofo', 'solofo'),
    ('solontena', 'solontena'),
    ('somahila', 'somahila'),
    ('sophie', 'sophie'),
    ('stephen', 'stephen'),
    ('theodore', 'theodore'),
    ('tombo', 'tombo'),
    ('tombozafy', 'tombozafy'),
    ('tsilanja', 'tsilanja'),
    ('vachia', 'vachia'),
    ('valerie', 'valerie'),
    ('velene', 'velene'),
    ('velonjara', 'velonjara'),
    ('venor', 'venor'),
    ('veronique', 'veronique'),
    ('zafisoa_nila', 'zafisoa_nila')
) AS [Source] (
  WCSPROGRAMS_SurveyorExtCode,
  WCSPROGRAMS_SurveyorName
) ON [Target].WCSPROGRAMS_SurveyorExtCode = [Source].WCSPROGRAMS_SurveyorExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_SurveyorExtCode = [Source].WCSPROGRAMS_SurveyorExtCode,
  [Target].WCSPROGRAMS_SurveyorName = [Source].WCSPROGRAMS_SurveyorName
  WHEN NOT MATCHED THEN
INSERT
  (
    WCSPROGRAMS_SurveyorExtCode,
    WCSPROGRAMS_SurveyorName
  )
VALUES
  (
    [Source].WCSPROGRAMS_SurveyorExtCode,
    [Source].WCSPROGRAMS_SurveyorName
  );

MERGE WCSPROGRAMS_SharksRaysYesNo AS [Target] USING (
  VALUES
    ('yes', 'yes'),
    ('no', 'no')
) AS [Source] (
  WCSPROGRAMS_SharksRaysYesNoExtCode,
  WCSPROGRAMS_SharksRaysYesNoName
) ON [Target].WCSPROGRAMS_SharksRaysYesNoExtCode = [Source].WCSPROGRAMS_SharksRaysYesNoExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_SharksRaysYesNoExtCode = [Source].WCSPROGRAMS_SharksRaysYesNoExtCode,
  [Target].WCSPROGRAMS_SharksRaysYesNoName = [Source].WCSPROGRAMS_SharksRaysYesNoName
  WHEN NOT MATCHED THEN
INSERT
  (
    WCSPROGRAMS_SharksRaysYesNoExtCode,
    WCSPROGRAMS_SharksRaysYesNoName
  )
VALUES
  (
    [Source].WCSPROGRAMS_SharksRaysYesNoExtCode,
    [Source].WCSPROGRAMS_SharksRaysYesNoName
  );

MERGE WCSPROGRAMS_Boat AS [Target] USING (
  VALUES
    ('canoe', 'canoe'),
    ('dhow', 'dhow'),
    ('sail_boat', 'sail_boat'),
    ('motor_boat', 'motor_boat'),
    ('foot', 'foot'),
    ('other_boat', 'other_boat')
) AS [Source] (WCSPROGRAMS_BoatExtCode, WCSPROGRAMS_BoatName) ON [Target].WCSPROGRAMS_BoatExtCode = [Source].WCSPROGRAMS_BoatExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_BoatExtCode = [Source].WCSPROGRAMS_BoatExtCode,
  [Target].WCSPROGRAMS_BoatName = [Source].WCSPROGRAMS_BoatName
  WHEN NOT MATCHED THEN
INSERT
  (WCSPROGRAMS_BoatExtCode, WCSPROGRAMS_BoatName)
VALUES
  (
    [Source].WCSPROGRAMS_BoatExtCode,
    [Source].WCSPROGRAMS_BoatName
  );

MERGE WCSPROGRAMS_Gear AS [Target] USING (
  VALUES
    ('basket_traps', 'basket_traps'),
    ('hook_line', 'hook_line'),
    ('spear_gun', 'spear_gun'),
    ('beach_seines', 'beach_seines'),
    ('ring_nets', 'ring_nets'),
    ('gill_nets_3', 'gill_nets_3'),
    ('gill_nets_6', 'gill_nets_6'),
    ('longline', 'longline'),
    ('reef_seine_set_net', 'reef_seine_set_net'),
    ('drift_net', 'drift_net'),
    ('shark_nets_6', 'shark_nets_6'),
    ('long_line', 'long_line'),
    ('line', 'line'),
    ('net', 'net'),
    ('trap', 'trap'),
    ('harpoon', 'harpoon'),
    ('rifle', 'rifle'),
    ('fishnet', 'fishnet'),
    ('rapalan', 'rapalan'),
    ('bottom_gillnetting', 'bottom_gillnetting'),
    ('surface_gillnetting', 'surface_gillnetting'),
    ('longlines', 'longlines'),
    ('beach_seine', 'beach_seine'),
    ('line_fishing', 'line_fishing'),
    ('basket_trap', 'basket_trap'),
    ('speargun', 'speargun'),
    ('purse_seine', 'purse_seine')
) AS [Source] (WCSPROGRAMS_GearExtCode, WCSPROGRAMS_GearName) ON [Target].WCSPROGRAMS_GearExtCode = [Source].WCSPROGRAMS_GearExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_GearExtCode = [Source].WCSPROGRAMS_GearExtCode,
  [Target].WCSPROGRAMS_GearName = [Source].WCSPROGRAMS_GearName
  WHEN NOT MATCHED THEN
INSERT
  (WCSPROGRAMS_GearExtCode, WCSPROGRAMS_GearName)
VALUES
  (
    [Source].WCSPROGRAMS_GearExtCode,
    [Source].WCSPROGRAMS_GearName
  );

MERGE WCSPROGRAMS_Unit AS [Target] USING (
  VALUES
    ('cm', 'cm'),
    ('inches', 'inches'),
    ('fingers', 'fingers')
) AS [Source] (WCSPROGRAMS_UnitExtCode, WCSPROGRAMS_UnitName) ON [Target].WCSPROGRAMS_UnitExtCode = [Source].WCSPROGRAMS_UnitExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_UnitExtCode = [Source].WCSPROGRAMS_UnitExtCode,
  [Target].WCSPROGRAMS_UnitName = [Source].WCSPROGRAMS_UnitName
  WHEN NOT MATCHED THEN
INSERT
  (WCSPROGRAMS_UnitExtCode, WCSPROGRAMS_UnitName)
VALUES
  (
    [Source].WCSPROGRAMS_UnitExtCode,
    [Source].WCSPROGRAMS_UnitName
  );

MERGE WCSPROGRAMS_Habitat AS [Target] USING (
  VALUES
    ('reef', 'reef'),
    ('sand', 'sand'),
    ('mud', 'mud'),
    ('mangrove', 'mangrove'),
    ('river', 'river'),
    ('seagrass', 'seagrass'),
    ('other_habitat', 'other_habitat')
) AS [Source] (
  WCSPROGRAMS_HabitatExtCode,
  WCSPROGRAMS_HabitatName
) ON [Target].WCSPROGRAMS_HabitatExtCode = [Source].WCSPROGRAMS_HabitatExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_HabitatExtCode = [Source].WCSPROGRAMS_HabitatExtCode,
  [Target].WCSPROGRAMS_HabitatName = [Source].WCSPROGRAMS_HabitatName
  WHEN NOT MATCHED THEN
INSERT
  (
    WCSPROGRAMS_HabitatExtCode,
    WCSPROGRAMS_HabitatName
  )
VALUES
  (
    [Source].WCSPROGRAMS_HabitatExtCode,
    [Source].WCSPROGRAMS_HabitatName
  );

MERGE WCSPROGRAMS_Type AS [Target] USING (
  VALUES
    ('shark', 'shark'),
    ('ray', 'ray'),
    ('shark_like_ray', 'shark_like_ray')
) AS [Source] (WCSPROGRAMS_TypeExtCode, WCSPROGRAMS_TypeName) ON [Target].WCSPROGRAMS_TypeExtCode = [Source].WCSPROGRAMS_TypeExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_TypeExtCode = [Source].WCSPROGRAMS_TypeExtCode,
  [Target].WCSPROGRAMS_TypeName = [Source].WCSPROGRAMS_TypeName
  WHEN NOT MATCHED THEN
INSERT
  (WCSPROGRAMS_TypeExtCode, WCSPROGRAMS_TypeName)
VALUES
  (
    [Source].WCSPROGRAMS_TypeExtCode,
    [Source].WCSPROGRAMS_TypeName
  );

MERGE WCSPROGRAMS_Genus AS [Target] USING (
  VALUES
    ('unknown_ray', 'unknown_ray'),
    ('unknown_shark', 'unknown_shark'),
    (
      'unknown shark_like_ray',
      'unknown shark_like_ray'
    ),
    ('acroteriobatus', 'acroteriobatus'),
    ('aetobatus', 'aetobatus'),
    ('aetomylaeus', 'aetomylaeus'),
    ('alopias', 'alopias'),
    ('anacanthobatis', 'anacanthobatis'),
    ('apristurus', 'apristurus'),
    ('bathyraja', 'bathyraja'),
    ('bathytoshia', 'bathytoshia'),
    ('benthobatis', 'benthobatis'),
    ('bythaelurus', 'bythaelurus'),
    ('callorhinchus', 'callorhinchus'),
    ('carcharhinus', 'carcharhinus'),
    ('carcharias', 'carcharias'),
    ('carcharodon', 'carcharodon'),
    ('centrophorus', 'centrophorus'),
    ('centroscymnus', 'centroscymnus'),
    ('centroselachus', 'centroselachus'),
    ('cephaloscyllium', 'cephaloscyllium'),
    ('cetorhinus', 'cetorhinus'),
    ('chiloscyllium', 'chiloscyllium'),
    ('chimaera', 'chimaera'),
    ('chlamydoselachus', 'chlamydoselachus'),
    ('cirrhigaleus', 'cirrhigaleus'),
    ('cruriraja', 'cruriraja'),
    ('ctenacis', 'ctenacis'),
    ('dalatias', 'dalatias'),
    ('dasyatis', 'dasyatis'),
    ('deania', 'deania'),
    ('dipturus', 'dipturus'),
    ('echinorhinus', 'echinorhinus'),
    ('electrolux', 'electrolux'),
    ('eridacnis', 'eridacnis'),
    ('etmopterus', 'etmopterus'),
    ('euprotomicrus', 'euprotomicrus'),
    ('fenestraja', 'fenestraja'),
    ('galeocerdo', 'galeocerdo'),
    ('glaucostegus', 'glaucostegus'),
    ('gymnura', 'gymnura'),
    ('halaelurus', 'halaelurus'),
    ('haploblepharus', 'haploblepharus'),
    ('harriotta', 'harriotta'),
    ('hemigaleus', 'hemigaleus'),
    ('hemipristis', 'hemipristis'),
    ('heptranchias', 'heptranchias'),
    ('heterodontus', 'heterodontus'),
    ('heteronarce', 'heteronarce'),
    ('heteroscymnoides', 'heteroscymnoides'),
    ('hexanchus', 'hexanchus'),
    ('hexatrygon', 'hexatrygon'),
    ('himantura', 'himantura'),
    ('holohalaelurus', 'holohalaelurus'),
    ('hydrolagus', 'hydrolagus'),
    ('hypogaleus', 'hypogaleus'),
    ('indobatis', 'indobatis'),
    ('isistius', 'isistius'),
    ('isurus', 'isurus'),
    ('leucoraja', 'leucoraja'),
    ('loxodon', 'loxodon'),
    ('maculabatis', 'maculabatis'),
    ('megatrygon', 'megatrygon'),
    ('mitsukurina', 'mitsukurina'),
    ('mobula', 'mobula'),
    ('mustelus', 'mustelus'),
    ('myliobatis', 'myliobatis'),
    ('narcine', 'narcine'),
    ('narke', 'narke'),
    ('nebrius', 'nebrius'),
    ('negaprion', 'negaprion'),
    ('neoharriotta', 'neoharriotta'),
    ('neotrygon', 'neotrygon'),
    ('notorynchus', 'notorynchus'),
    ('odontaspis', 'odontaspis'),
    ('okamejei', 'okamejei'),
    ('oxynotus', 'oxynotus'),
    ('paragaleus', 'paragaleus'),
    ('pastinachus', 'pastinachus'),
    ('pateobatis', 'pateobatis'),
    ('plesiobatis', 'plesiobatis'),
    ('pliotrema', 'pliotrema'),
    ('poroderma', 'poroderma'),
    ('prionace', 'prionace'),
    ('pristiophorus', 'pristiophorus'),
    ('pristis', 'pristis'),
    ('pseudocarcharias', 'pseudocarcharias'),
    ('pseudoginglymostoma', 'pseudoginglymostoma'),
    ('pseudotriakis', 'pseudotriakis'),
    ('pteroplatytrygon', 'pteroplatytrygon'),
    ('raja', 'raja'),
    ('rajella', 'rajella'),
    ('rhina', 'rhina'),
    ('rhincodon', 'rhincodon'),
    ('rhinobatos', 'rhinobatos'),
    ('rhinochimaera', 'rhinochimaera'),
    ('rhinoptera', 'rhinoptera'),
    ('rhizoprionodon', 'rhizoprionodon'),
    ('rhynchobatus', 'rhynchobatus'),
    ('rostroraja', 'rostroraja'),
    ('scoliodon', 'scoliodon'),
    ('scyliorhinus', 'scyliorhinus'),
    ('scylliogaleus', 'scylliogaleus'),
    ('scymnodon', 'scymnodon'),
    ('sinobatis', 'sinobatis'),
    ('somniosus', 'somniosus'),
    ('sphyrna', 'sphyrna'),
    ('squaliolus', 'squaliolus'),
    ('squalus', 'squalus'),
    ('squatina', 'squatina'),
    ('stegostoma', 'stegostoma'),
    ('taeniura', 'taeniura'),
    ('taeniurops', 'taeniurops'),
    ('torpedo', 'torpedo'),
    ('triaenodon', 'triaenodon'),
    ('triakis', 'triakis'),
    ('urogymnus', 'urogymnus'),
    ('zameus', 'zameus')
) AS [Source] (WCSPROGRAMS_GenusExtCode, WCSPROGRAMS_GenusName) ON [Target].WCSPROGRAMS_GenusExtCode = [Source].WCSPROGRAMS_GenusExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_GenusExtCode = [Source].WCSPROGRAMS_GenusExtCode,
  [Target].WCSPROGRAMS_GenusName = [Source].WCSPROGRAMS_GenusName
  WHEN NOT MATCHED THEN
INSERT
  (WCSPROGRAMS_GenusExtCode, WCSPROGRAMS_GenusName)
VALUES
  (
    [Source].WCSPROGRAMS_GenusExtCode,
    [Source].WCSPROGRAMS_GenusName
  );

MERGE WCSPROGRAMS_Species AS [Target] USING (
  VALUES
    ('unknown_species', 'unknown_species'),
    (
      'acroteriobatus_annulatus',
      'acroteriobatus_annulatus'
    ),
    (
      'acroteriobatus_leucospilus',
      'acroteriobatus_leucospilus'
    ),
    (
      'acroteriobatus_ocellatus',
      'acroteriobatus_ocellatus'
    ),
    (
      'acroteriobatus_zanzibarensis',
      'acroteriobatus_zanzibarensis'
    ),
    ('aetobatus_ocellatus', 'aetobatus_ocellatus'),
    ('aetomylaeus_bovinus', 'aetomylaeus_bovinus'),
    (
      'aetomylaeus_vespertilio',
      'aetomylaeus_vespertilio'
    ),
    ('alopias_pelagicus', 'alopias_pelagicus'),
    ('alopias_superciliosus', 'alopias_superciliosus'),
    ('alopias_vulpinus', 'alopias_vulpinus'),
    (
      'anacanthobatis_marmorata',
      'anacanthobatis_marmorata'
    ),
    (
      'apristurus_cf_sinensis',
      'apristurus_cf_sinensis'
    ),
    ('apristurus_indicus', 'apristurus_indicus'),
    (
      'apristurus_longicephalus',
      'apristurus_longicephalus'
    ),
    ('bathyraja_tunae', 'bathyraja_tunae'),
    (
      'bathytoshia_brevicaudata',
      'bathytoshia_brevicaudata'
    ),
    ('bathytoshia_lata', 'bathytoshia_lata'),
    ('benthobatis_moresbyi', 'benthobatis_moresbyi'),
    ('bythaelurus_bachi', 'bythaelurus_bachi'),
    ('bythaelurus_clevai', 'bythaelurus_clevai'),
    ('bythaelurus_hispidus', 'bythaelurus_hispidus'),
    ('bythaelurus_lutarius', 'bythaelurus_lutarius'),
    ('bythaelurus_naylori', 'bythaelurus_naylori'),
    ('bythaelurus_stewarti', 'bythaelurus_stewarti'),
    (
      'bythaelurus_tenuicephalus',
      'bythaelurus_tenuicephalus'
    ),
    ('bythaelurus_vivaldii', 'bythaelurus_vivaldii'),
    (
      'callorhinchus_capensis',
      'callorhinchus_capensis'
    ),
    (
      'carcharhinus_albimarginatus',
      'carcharhinus_albimarginatus'
    ),
    ('carcharhinus_altimus', 'carcharhinus_altimus'),
    (
      'carcharhinus_amblyrhynchoides',
      'carcharhinus_amblyrhynchoides'
    ),
    (
      'carcharhinus_amblyrhynchos',
      'carcharhinus_amblyrhynchos'
    ),
    (
      'carcharhinus_amboinensis',
      'carcharhinus_amboinensis'
    ),
    (
      'carcharhinus_brachyurus',
      'carcharhinus_brachyurus'
    ),
    (
      'carcharhinus_brevipinna',
      'carcharhinus_brevipinna'
    ),
    (
      'carcharhinus_falciformis',
      'carcharhinus_falciformis'
    ),
    (
      'carcharhinus_galapagensis',
      'carcharhinus_galapagensis'
    ),
    ('carcharhinus_humani', 'carcharhinus_humani'),
    ('carcharhinus_leucas', 'carcharhinus_leucas'),
    ('carcharhinus_limbatus', 'carcharhinus_limbatus'),
    (
      'carcharhinus_longimanus',
      'carcharhinus_longimanus'
    ),
    ('carcharhinus_macloti', 'carcharhinus_macloti'),
    (
      'carcharhinus_melanopterus',
      'carcharhinus_melanopterus'
    ),
    ('carcharhinus_obscurus', 'carcharhinus_obscurus'),
    ('carcharhinus_plumbeus', 'carcharhinus_plumbeus'),
    ('carcharhinus_sorrah', 'carcharhinus_sorrah'),
    ('carcharias_taurus', 'carcharias_taurus'),
    (
      'carcharodon_carcharias',
      'carcharodon_carcharias'
    ),
    (
      'centrophorus_granulosus',
      'centrophorus_granulosus'
    ),
    ('centrophorus_lesliei', 'centrophorus_lesliei'),
    (
      'centrophorus_moluccensis',
      'centrophorus_moluccensis'
    ),
    (
      'centrophorus_seychellorum',
      'centrophorus_seychellorum'
    ),
    (
      'centrophorus_squamosus',
      'centrophorus_squamosus'
    ),
    (
      'centroscymnus_coelolepis',
      'centroscymnus_coelolepis'
    ),
    ('centroscymnus_owstoni', 'centroscymnus_owstoni'),
    (
      'centroselachus_crepidater',
      'centroselachus_crepidater'
    ),
    (
      'cephaloscyllium_sufflans',
      'cephaloscyllium_sufflans'
    ),
    ('cetorhinus_maximus', 'cetorhinus_maximus'),
    (
      'chiloscyllium_caeruleopunctatum',
      'chiloscyllium_caeruleopunctatum'
    ),
    ('chimaera_buccanigella', 'chimaera_buccanigella'),
    ('chimaera_didierae', 'chimaera_didierae'),
    ('chimaera_sp_n', 'chimaera_sp_n'),
    ('chimaera_willwatchi', 'chimaera_willwatchi'),
    (
      'chlamydoselachus_africana',
      'chlamydoselachus_africana'
    ),
    ('cirrhigaleus_asper', 'cirrhigaleus_asper'),
    ('cruriraja_andamanica', 'cruriraja_andamanica'),
    ('cruriraja_hulleyi', 'cruriraja_hulleyi'),
    (
      'cruriraja_parcomaculata',
      'cruriraja_parcomaculata'
    ),
    ('ctenacis_fehlmanni', 'ctenacis_fehlmanni'),
    ('dalatias_licha', 'dalatias_licha'),
    ('dasyatis_chrysonota', 'dasyatis_chrysonota'),
    ('deania_calcea', 'deania_calcea'),
    ('deania_profundorum', 'deania_profundorum'),
    ('deania_quadrispinosa', 'deania_quadrispinosa'),
    ('dipturus_campbelli', 'dipturus_campbelli'),
    ('dipturus_crosnieri', 'dipturus_crosnieri'),
    (
      'dipturus_johannisdavisi',
      'dipturus_johannisdavisi'
    ),
    (
      'dipturus_lanceorostratus',
      'dipturus_lanceorostratus'
    ),
    (
      'dipturus_pullopunctatus',
      'dipturus_pullopunctatus'
    ),
    ('dipturus_springeri', 'dipturus_springeri'),
    (
      'dipturus_stenorhynchus',
      'dipturus_stenorhynchus'
    ),
    ('echinorhinus_brucus', 'echinorhinus_brucus'),
    ('electrolux_addisoni', 'electrolux_addisoni'),
    ('eridacnis_radcliffei', 'eridacnis_radcliffei'),
    ('eridacnis_sinuans', 'eridacnis_sinuans'),
    ('etmopterus_alphus', 'etmopterus_alphus'),
    ('etmopterus_bigelowi', 'etmopterus_bigelowi'),
    ('etmopterus_compagnoi', 'etmopterus_compagnoi'),
    ('etmopterus_granulosus', 'etmopterus_granulosus'),
    ('etmopterus_lucifer', 'etmopterus_lucifer'),
    ('etmopterus_pusillus', 'etmopterus_pusillus'),
    ('etmopterus_sculptus', 'etmopterus_sculptus'),
    ('etmopterus_sentosus', 'etmopterus_sentosus'),
    (
      'euprotomicrus_bispinatus',
      'euprotomicrus_bispinatus'
    ),
    (
      'fenestraja_maceachrani',
      'fenestraja_maceachrani'
    ),
    ('galeocerdo_cuvier', 'galeocerdo_cuvier'),
    ('glaucostegus_halavi', 'glaucostegus_halavi'),
    ('glaucostegus_petiti', 'glaucostegus_petiti'),
    ('gymnura_natalensis', 'gymnura_natalensis'),
    ('gymnura_poecilura', 'gymnura_poecilura'),
    ('halaelurus_boesemani', 'halaelurus_boesemani'),
    ('halaelurus_lineatus', 'halaelurus_lineatus'),
    ('halaelurus_natalensis', 'halaelurus_natalensis'),
    ('halaelurus_quagga', 'halaelurus_quagga'),
    ('haploblepharus_fuscus', 'haploblepharus_fuscus'),
    (
      'haploblepharus_kistnasamyi',
      'haploblepharus_kistnasamyi'
    ),
    ('harriotta_raleighana', 'harriotta_raleighana'),
    ('hemigaleus_microstoma', 'hemigaleus_microstoma'),
    ('hemipristis_elongata', 'hemipristis_elongata'),
    ('heptranchias_perlo', 'heptranchias_perlo'),
    (
      'heterodontus_ramalheira',
      'heterodontus_ramalheira'
    ),
    ('heteronarce_garmani', 'heteronarce_garmani'),
    ('heteronarce_mollis', 'heteronarce_mollis'),
    (
      'heteroscymnoides_marleyi',
      'heteroscymnoides_marleyi'
    ),
    ('hexanchus_griseus', 'hexanchus_griseus'),
    ('hexanchus_nakamurai', 'hexanchus_nakamurai'),
    ('hexatrygon_bickelli', 'hexatrygon_bickelli'),
    ('himantura_leoparda', 'himantura_leoparda'),
    ('himantura_uarnak', 'himantura_uarnak'),
    ('holohalaelurus_favus', 'holohalaelurus_favus'),
    (
      'holohalaelurus_grennian',
      'holohalaelurus_grennian'
    ),
    (
      'holohalaelurus_melanostigma',
      'holohalaelurus_melanostigma'
    ),
    (
      'holohalaelurus_punctatus',
      'holohalaelurus_punctatus'
    ),
    ('holohalaelurus_regani', 'holohalaelurus_regani'),
    ('hydrolagus_africanus', 'hydrolagus_africanus'),
    ('hypogaleus_hyugaensis', 'hypogaleus_hyugaensis'),
    ('indobatis_ori', 'indobatis_ori'),
    ('isistius_brasiliensis', 'isistius_brasiliensis'),
    ('isurus_oxyrinchus', 'isurus_oxyrinchus'),
    ('isurus_paucus', 'isurus_paucus'),
    ('leucoraja_compagnoi', 'leucoraja_compagnoi'),
    ('leucoraja_elaineae', 'leucoraja_elaineae'),
    ('leucoraja_wallacei', 'leucoraja_wallacei'),
    ('loxodon_macrorhinus', 'loxodon_macrorhinus'),
    ('maculabatis_ambigua', 'maculabatis_ambigua'),
    ('megatrygon_microps', 'megatrygon_microps'),
    ('mitsukurina_owstoni', 'mitsukurina_owstoni'),
    ('mobula_alfredi', 'mobula_alfredi'),
    ('mobula_birostris', 'mobula_birostris'),
    ('mobula_eregoodoo', 'mobula_eregoodoo'),
    ('mobula_kuhlii', 'mobula_kuhlii'),
    ('mobula_mobular', 'mobula_mobular'),
    ('mobula_tarapacana', 'mobula_tarapacana'),
    ('mobula_thurstoni', 'mobula_thurstoni'),
    ('mustelus_manazo', 'mustelus_manazo'),
    ('mustelus_mosis', 'mustelus_mosis'),
    ('mustelus_mustelus', 'mustelus_mustelus'),
    ('mustelus_palumbes', 'mustelus_palumbes'),
    ('myliobatis_aquila', 'myliobatis_aquila'),
    ('narcine_insolita', 'narcine_insolita'),
    ('narcine_rierai', 'narcine_rierai'),
    ('narke_capensis', 'narke_capensis'),
    ('nebrius_ferrugineus', 'nebrius_ferrugineus'),
    ('negaprion_acutidens', 'negaprion_acutidens'),
    ('neoharriotta_pumila', 'neoharriotta_pumila'),
    (
      'neotrygon_caeruleopunctata',
      'neotrygon_caeruleopunctata'
    ),
    (
      'notorynchus_cepedianus',
      'notorynchus_cepedianus'
    ),
    ('odontaspis_ferox', 'odontaspis_ferox'),
    ('odontaspis_noronhai', 'odontaspis_noronhai'),
    ('okamejei_heemstrai', 'okamejei_heemstrai'),
    ('okamejei_ornata', 'okamejei_ornata'),
    ('oxynotus_centrina', 'oxynotus_centrina'),
    (
      'paragaleus_leucolomatus',
      'paragaleus_leucolomatus'
    ),
    ('pastinachus_ater', 'pastinachus_ater'),
    ('pateobatis_fai', 'pateobatis_fai'),
    ('pateobatis_jenkinsii', 'pateobatis_jenkinsii'),
    ('plesiobatis_daviesi', 'plesiobatis_daviesi'),
    ('pliotrema_annae', 'pliotrema_annae'),
    ('pliotrema_kajae', 'pliotrema_kajae'),
    ('pliotrema_warreni', 'pliotrema_warreni'),
    ('poroderma_africanum', 'poroderma_africanum'),
    ('poroderma_pantherinum', 'poroderma_pantherinum'),
    ('prionace_glauca', 'prionace_glauca'),
    ('pristiophorus_nancyae', 'pristiophorus_nancyae'),
    ('pristis_pristis', 'pristis_pristis'),
    ('pristis_zijsron', 'pristis_zijsron'),
    (
      'pseudocarcharias_kamoharai',
      'pseudocarcharias_kamoharai'
    ),
    (
      'pseudoginglymostoma_brevicaudatum',
      'pseudoginglymostoma_brevicaudatum'
    ),
    (
      'pseudotriakis_microdon',
      'pseudotriakis_microdon'
    ),
    (
      'pteroplatytrygon_violacea',
      'pteroplatytrygon_violacea'
    ),
    ('raja_clavata', 'raja_clavata'),
    ('raja_ocellifera', 'raja_ocellifera'),
    ('raja_straeleni', 'raja_straeleni'),
    ('rajella_caudaspinosa', 'rajella_caudaspinosa'),
    ('rajella_leopardus', 'rajella_leopardus'),
    ('rajella_paucispinosa', 'rajella_paucispinosa'),
    ('rhina_ancylostomus', 'rhina_ancylostomus'),
    ('rhincodon_typus', 'rhincodon_typus'),
    ('rhinobatos_austini', 'rhinobatos_austini'),
    (
      'rhinobatos_holcorhynchus',
      'rhinobatos_holcorhynchus'
    ),
    (
      'rhinochimaera_africana',
      'rhinochimaera_africana'
    ),
    (
      'rhinochimaera_atlantica',
      'rhinochimaera_atlantica'
    ),
    ('rhinoptera_jayakari', 'rhinoptera_jayakari'),
    ('rhizoprionodon_acutus', 'rhizoprionodon_acutus'),
    (
      'rhynchobatus_australiae',
      'rhynchobatus_australiae'
    ),
    (
      'rhynchobatus_djiddensis',
      'rhynchobatus_djiddensis'
    ),
    ('rhynchobatus_laevis', 'rhynchobatus_laevis'),
    ('rostroraja_alba', 'rostroraja_alba'),
    ('scoliodon_laticaudus', 'scoliodon_laticaudus'),
    ('scyliorhinus_capensis', 'scyliorhinus_capensis'),
    (
      'scyliorhinus_comoroensis',
      'scyliorhinus_comoroensis'
    ),
    (
      'scylliogaleus_quecketti',
      'scylliogaleus_quecketti'
    ),
    ('scymnodon_plunketi', 'scymnodon_plunketi'),
    ('sinobatis_brevicauda', 'sinobatis_brevicauda'),
    ('somniosus_antarcticus', 'somniosus_antarcticus'),
    ('sphyrna_lewini', 'sphyrna_lewini'),
    ('sphyrna_mokarran', 'sphyrna_mokarran'),
    ('sphyrna_zygaena', 'sphyrna_zygaena'),
    ('squaliolus_laticaudus', 'squaliolus_laticaudus'),
    ('squalus_acutipinnis', 'squalus_acutipinnis'),
    ('squalus_bassi', 'squalus_bassi'),
    ('squalus_cf_blainville', 'squalus_cf_blainville'),
    ('squalus_lalannei', 'squalus_lalannei'),
    ('squalus_mahia', 'squalus_mahia'),
    ('squatina_africana', 'squatina_africana'),
    ('stegostoma_fasciatum', 'stegostoma_fasciatum'),
    ('taeniura_lymma', 'taeniura_lymma'),
    ('taeniurops_meyeni', 'taeniurops_meyeni'),
    ('torpedo_fuscomaculata', 'torpedo_fuscomaculata'),
    ('torpedo_sinuspersici', 'torpedo_sinuspersici'),
    ('triaenodon_obesus', 'triaenodon_obesus'),
    ('triakis_megalopterus', 'triakis_megalopterus'),
    ('urogymnus_asperrimus', 'urogymnus_asperrimus'),
    ('urogymnus_granulatus', 'urogymnus_granulatus'),
    ('zameus_squamulosus', 'zameus_squamulosus')
) AS [Source] (
  WCSPROGRAMS_SpeciesExtCode,
  WCSPROGRAMS_SpeciesName
) ON [Target].WCSPROGRAMS_SpeciesExtCode = [Source].WCSPROGRAMS_SpeciesExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_SpeciesExtCode = [Source].WCSPROGRAMS_SpeciesExtCode,
  [Target].WCSPROGRAMS_SpeciesName = [Source].WCSPROGRAMS_SpeciesName
  WHEN NOT MATCHED THEN
INSERT
  (
    WCSPROGRAMS_SpeciesExtCode,
    WCSPROGRAMS_SpeciesName
  )
VALUES
  (
    [Source].WCSPROGRAMS_SpeciesExtCode,
    [Source].WCSPROGRAMS_SpeciesName
  );

MERGE WCSPROGRAMS_Sex AS [Target] USING (
  VALUES
    ('female', 'female'),
    ('male', 'male'),
    ('undetermined', 'undetermined')
) AS [Source] (WCSPROGRAMS_SexExtCode, WCSPROGRAMS_SexName) ON [Target].WCSPROGRAMS_SexExtCode = [Source].WCSPROGRAMS_SexExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_SexExtCode = [Source].WCSPROGRAMS_SexExtCode,
  [Target].WCSPROGRAMS_SexName = [Source].WCSPROGRAMS_SexName
  WHEN NOT MATCHED THEN
INSERT
  (WCSPROGRAMS_SexExtCode, WCSPROGRAMS_SexName)
VALUES
  (
    [Source].WCSPROGRAMS_SexExtCode,
    [Source].WCSPROGRAMS_SexName
  );

MERGE WCSPROGRAMS_Fish AS [Target] USING (
  VALUES
    ('abolavohindriake', 'abolavohindriake'),
    ('aganogno', 'aganogno'),
    ('ahidava', 'ahidava'),
    ('akio', 'akio'),
    ('akio_atendromaso', 'akio_atendromaso'),
    ('akio_biloha', 'akio_biloha'),
    ('akio_mainty_lamosy', 'akio_mainty_lamosy'),
    ('akio_mainty_pate', 'akio_mainty_pate'),
    ('akio_tandraly', 'akio_tandraly'),
    ('akiofia', 'akiofia'),
    ('akioviko', 'akioviko'),
    ('aleta', 'aleta'),
    ('aloalo', 'aloalo'),
    ('alovo', 'alovo'),
    ('alovomena', 'alovomena'),
    ('amalogna', 'amalogna'),
    ('amalombamaho', 'amalombamaho'),
    ('amalombandana', 'amalombandana'),
    ('amalomena', 'amalomena'),
    ('amalona', 'amalona'),
    ('amalonantsingora', 'amalonantsingora'),
    ('amato', 'amato'),
    ('ambalily', 'ambalily'),
    ('ambamba', 'ambamba'),
    ('ambanaka', 'ambanaka'),
    ('ambanivava', 'ambanivava'),
    ('ambany', 'ambany'),
    ('ambariadava', 'ambariadava'),
    ('ambariadriva', 'ambariadriva'),
    ('ambariaka', 'ambariaka'),
    ('ambariake', 'ambariake'),
    ('ambasisy', 'ambasisy'),
    ('ambatsaramena', 'ambatsaramena'),
    ('ambatsoy', 'ambatsoy'),
    ('ambatsy', 'ambatsy'),
    ('ambatsy_bemaso', 'ambatsy_bemaso'),
    ('ambatsy_mena', 'ambatsy_mena'),
    ('ambatsy_sirana', 'ambatsy_sirana'),
    ('ambatsy_soratra', 'ambatsy_soratra'),
    ('ambila', 'ambila'),
    ('ambitry', 'ambitry'),
    ('ambitry_bemaso', 'ambitry_bemaso'),
    ('ambitry_bemasofotsy', 'ambitry_bemasofotsy'),
    ('ambitry_fisaka', 'ambitry_fisaka'),
    ('ambitry_fotsy', 'ambitry_fotsy'),
    ('ambitry_lava', 'ambitry_lava'),
    ('ambitry_menatenda', 'ambitry_menatenda'),
    ('ambitsy', 'ambitsy'),
    ('amboke', 'amboke'),
    ('ambolevonitse', 'ambolevonitse'),
    ('amboramasake', 'amboramasake'),
    ('ambory', 'ambory'),
    ('ambosobe', 'ambosobe'),
    ('ambosy', 'ambosy'),
    ('ambotso', 'ambotso'),
    ('ampandro', 'ampandro'),
    ('ampandrobe', 'ampandrobe'),
    ('ampiny', 'ampiny'),
    ('ampiny_fisaka', 'ampiny_fisaka'),
    ('amporama', 'amporama'),
    ('ampotra', 'ampotra'),
    ('ampozo', 'ampozo'),
    ('ampozonara', 'ampozonara'),
    ('ampozonkara', 'ampozonkara'),
    ('anadanora', 'anadanora'),
    ('anandovo', 'anandovo'),
    ('anantsindra', 'anantsindra'),
    ('andrame', 'andrame'),
    ('andranofalafa', 'andranofalafa'),
    ('andraramy', 'andraramy'),
    ('androaro', 'androaro'),
    ('angaravoha', 'angaravoha'),
    ('angarera', 'angarera'),
    ('angelike', 'angelike'),
    ('angera', 'angera'),
    ('angeriky', 'angeriky'),
    ('angisindolo', 'angisindolo'),
    ('angisy', 'angisy'),
    ('ango', 'ango'),
    ('angotra', 'angotra'),
    ('angoza', 'angoza'),
    ('angy', 'angy'),
    ('angy_mainty', 'angy_mainty'),
    ('angy_menasofy', 'angy_menasofy'),
    ('angy_soanada', 'angy_soanada'),
    ('angy_vola', 'angy_vola'),
    ('anjarame', 'anjarame'),
    ('ankanjodaba', 'ankanjodaba'),
    ('ankiranga', 'ankiranga'),
    ('antafa', 'antafa'),
    ('antafana', 'antafana'),
    ('antegnategnamaso', 'antegnategnamaso'),
    ('antendromaso', 'antendromaso'),
    ('antohitsalady', 'antohitsalady'),
    ('antohy', 'antohy'),
    ('antoma', 'antoma'),
    ('antsera_matseroke', 'antsera_matseroke'),
    ('antserabandana', 'antserabandana'),
    ('antseradava', 'antseradava'),
    ('antseraka', 'antseraka'),
    ('antseraka_fotsy', 'antseraka_fotsy'),
    ('antserakahitra', 'antserakahitra'),
    ('antserakandana', 'antserakandana'),
    ('antserakantsiva', 'antserakantsiva'),
    ('antserake', 'antserake'),
    ('antserapalafa', 'antserapalafa'),
    ('antserapisaka', 'antserapisaka'),
    ('antserapohy', 'antserapohy'),
    ('antsisy', 'antsisy'),
    ('antsoramby', 'antsoramby'),
    ('apozo', 'apozo'),
    ('ariloha', 'ariloha'),
    ('aroby', 'aroby'),
    ('asentry', 'asentry'),
    ('babake', 'babake'),
    ('babanjiake', 'babanjiake'),
    ('baboke', 'baboke'),
    ('baboko', 'baboko'),
    ('badaila', 'badaila'),
    ('badiga', 'badiga'),
    ('bado', 'bado'),
    ('badoky', 'badoky'),
    ('bafohy', 'bafohy'),
    ('bagnena', 'bagnena'),
    ('bahoby', 'bahoby'),
    ('bahotsy', 'bahotsy'),
    ('bakarybimaso', 'bakarybimaso'),
    ('barahoa', 'barahoa'),
    ('bariake', 'bariake'),
    ('batola', 'batola'),
    ('be_elatsery', 'be_elatsery'),
    ('beantambako', 'beantambako'),
    ('beja', 'beja'),
    ('belatse', 'belatse'),
    ('bemahasoa', 'bemahasoa'),
    ('bemaso', 'bemaso'),
    ('bemolotra', 'bemolotra'),
    ('bendra', 'bendra'),
    ('bendrabendra', 'bendrabendra'),
    ('benono', 'benono'),
    ('bepetaky', 'bepetaky'),
    ('beriberikoana', 'beriberikoana'),
    ('besisike', 'besisike'),
    ('besogny', 'besogny'),
    ('betampe', 'betampe'),
    ('betrabetra', 'betrabetra'),
    ('biaboty', 'biaboty'),
    ('biboly', 'biboly'),
    ('bidaramena', 'bidaramena'),
    ('bidofoko', 'bidofoko'),
    ('bihongo', 'bihongo'),
    ('bika', 'bika'),
    ('bilio', 'bilio'),
    ('biredin', 'biredin'),
    ('bisogny', 'bisogny'),
    ('bitaritry', 'bitaritry'),
    ('bitay', 'bitay'),
    ('bivazagna', 'bivazagna'),
    ('boalimena', 'boalimena'),
    ('bobohadohany', 'bobohadohany'),
    ('boboke', 'boboke'),
    ('boboty', 'boboty'),
    ('bodoloha', 'bodoloha'),
    ('bodolohamainty', 'bodolohamainty'),
    ('boezarano', 'boezarano'),
    ('bokeso', 'bokeso'),
    ('bokoravina', 'bokoravina'),
    ('boniky', 'boniky'),
    ('bonite', 'bonite'),
    ('bonity', 'bonity'),
    ('bontana', 'bontana'),
    ('bontantatsy', 'bontantatsy'),
    ('bontira', 'bontira'),
    ('borasake', 'borasake'),
    ('borosy', 'borosy'),
    ('bosiry', 'bosiry'),
    ('botosaka', 'botosaka'),
    ('botrily', 'botrily'),
    ('botsotsoke', 'botsotsoke'),
    ('bozitsy', 'bozitsy'),
    ('camelion', 'camelion'),
    ('crepi', 'crepi'),
    ('dabanjiake', 'dabanjiake'),
    ('dagarode', 'dagarode'),
    ('dangira', 'dangira'),
    ('davolamandrorona', 'davolamandrorona'),
    ('diboto', 'diboto'),
    ('dingadingana', 'dingadingana'),
    ('dofoko', 'dofoko'),
    ('donia', 'donia'),
    ('dorante', 'dorante'),
    ('dorolisy', 'dorolisy'),
    ('dosoloha', 'dosoloha'),
    ('drakaka', 'drakaka'),
    ('drihy', 'drihy'),
    ('fagnarabotry', 'fagnarabotry'),
    ('faikorombo', 'faikorombo'),
    ('famalipiky', 'famalipiky'),
    ('fambaka', 'fambaka'),
    ('famela', 'famela'),
    ('fatsikampify', 'fatsikampify'),
    ('fay', 'fay'),
    ('fay_andema', 'fay_andema'),
    ('fay_foty', 'fay_foty'),
    ('fay_gitara', 'fay_gitara'),
    ('fay_obany', 'fay_obany'),
    ('fay_rara', 'fay_rara'),
    ('fay_sify', 'fay_sify'),
    ('fay_tatama', 'fay_tatama'),
    ('fay_tomily', 'fay_tomily'),
    ('fay_vanda', 'fay_vanda'),
    ('felafela', 'felafela'),
    ('fepondo', 'fepondo'),
    ('feretse', 'feretse'),
    ('fetsomo', 'fetsomo'),
    ('fia_belatse', 'fia_belatse'),
    ('fia_botosaka', 'fia_botosaka'),
    ('fia_gamo', 'fia_gamo'),
    ('fia-antsisy', 'fia-antsisy'),
    ('fia-kapokaboky', 'fia-kapokaboky'),
    ('fia-mina', 'fia-mina'),
    ('fia-valalataitsy', 'fia-valalataitsy'),
    ('fiababoke', 'fiababoke'),
    ('fialazono', 'fialazono'),
    ('fiamainty', 'fiamainty'),
    ('fiamalandy', 'fiamalandy'),
    ('fiamalaza', 'fiamalaza'),
    ('fiamalemy', 'fiamalemy'),
    ('fiamalemy_bory', 'fiamalemy_bory'),
    ('fiamandry', 'fiamandry'),
    ('fiamangataka', 'fiamangataka'),
    ('fiamangidy', 'fiamangidy'),
    ('fiamasiake', 'fiamasiake'),
    ('fiambaza', 'fiambaza'),
    ('fiambazamondrazy', 'fiambazamondrazy'),
    ('fiambazana', 'fiambazana'),
    ('fiambola', 'fiambola'),
    ('fiambonjo', 'fiambonjo'),
    ('fiamena', 'fiamena'),
    ('fiamondrazy', 'fiamondrazy'),
    ('fiampileve', 'fiampileve'),
    ('fiampodo', 'fiampodo'),
    ('fiampotsy', 'fiampotsy'),
    ('fianakoho', 'fianakoho'),
    ('fianaombe', 'fianaombe'),
    ('fiandingoza', 'fiandingoza'),
    ('fiandolo', 'fiandolo'),
    ('fiantandroka', 'fiantandroka'),
    ('fiantandroko', 'fiantandroko'),
    ('fiantaroka', 'fiantaroka'),
    ('fiantsara', 'fiantsara'),
    ('fiantsaridiny', 'fiantsaridiny'),
    ('fiantsifa', 'fiantsifa'),
    ('fiantsilaka', 'fiantsilaka'),
    ('fiantsomo', 'fiantsomo'),
    ('fiantsomotse', 'fiantsomotse'),
    ('fihotsoky', 'fihotsoky'),
    ('fitse', 'fitse'),
    ('fotihohy', 'fotihohy'),
    ('fotitsetsake', 'fotitsetsake'),
    ('foza', 'foza'),
    ('fozabe', 'fozabe'),
    ('fozalava', 'fozalava'),
    ('fozalavakinko', 'fozalavakinko'),
    ('gabo', 'gabo'),
    ('gamo', 'gamo'),
    ('gamomena', 'gamomena'),
    ('garamasako', 'garamasako'),
    ('geba', 'geba'),
    ('goakabe', 'goakabe'),
    ('gogo', 'gogo'),
    ('gorogoro', 'gorogoro'),
    ('gosigosy', 'gosigosy'),
    ('gozigasy', 'gozigasy'),
    ('grostete', 'grostete'),
    ('hababa', 'hababa'),
    ('hajarame', 'hajarame'),
    ('hambanilaka', 'hambanilaka'),
    ('hambarabimaso', 'hambarabimaso'),
    ('hambikiraro', 'hambikiraro'),
    ('hambimena', 'hambimena'),
    ('hambindahy', 'hambindahy'),
    ('hambintsozo', 'hambintsozo'),
    ('hambontso', 'hambontso'),
    ('hamby', 'hamby'),
    ('hamby_paitaka', 'hamby_paitaka'),
    ('hampandro', 'hampandro'),
    ('hatokatenjo', 'hatokatenjo'),
    ('henalahy', 'henalahy'),
    ('henalaza', 'henalaza'),
    ('henjibe', 'henjibe'),
    ('henjy', 'henjy'),
    ('herobato', 'herobato'),
    ('herotro', 'herotro'),
    ('hoditrovy', 'hoditrovy'),
    ('hofy', 'hofy'),
    ('horita', 'horita'),
    ('horitanakora', 'horitanakora'),
    ('jagarade', 'jagarade'),
    ('jangarode', 'jangarode'),
    ('janogno', 'janogno'),
    ('jaodary', 'jaodary'),
    ('jebojebo', 'jebojebo'),
    ('jibandriake', 'jibandriake'),
    ('jihy', 'jihy'),
    ('jobirakoko', 'jobirakoko'),
    ('joginy', 'joginy'),
    ('joho', 'joho'),
    ('joiky', 'joiky'),
    ('jolaka', 'jolaka'),
    ('joligny', 'joligny'),
    ('jolojolo', 'jolojolo'),
    ('jomaly', 'jomaly'),
    ('jomaly_papa', 'jomaly_papa'),
    ('jombantsiaky', 'jombantsiaky'),
    ('kabo', 'kabo'),
    ('kabo_mena', 'kabo_mena'),
    ('kabokaboke', 'kabokaboke'),
    ('kabololo', 'kabololo'),
    ('kadraramy', 'kadraramy'),
    ('kadrendra', 'kadrendra'),
    ('kafatsy', 'kafatsy'),
    ('kaka', 'kaka'),
    ('kalama', 'kalama'),
    ('kalama_beloha', 'kalama_beloha'),
    ('kalama_sao', 'kalama_sao'),
    ('kalama_voanjo', 'kalama_voanjo'),
    ('kalamaitso', 'kalamaitso'),
    ('kalamara', 'kalamara'),
    ('kantsane', 'kantsane'),
    ('kapiteny', 'kapiteny'),
    ('kapoake', 'kapoake'),
    ('kapoteny', 'kapoteny'),
    ('karara', 'karara'),
    ('kararabekibo', 'kararabekibo'),
    ('kararabimaso', 'kararabimaso'),
    ('karatake', 'karatake'),
    ('karavarahana', 'karavarahana'),
    ('kaseaky', 'kaseaky'),
    ('kasera', 'kasera'),
    ('kaserafotsy', 'kaserafotsy'),
    ('katikatike', 'katikatike'),
    ('katirera', 'katirera'),
    ('katirera_bisogny', 'katirera_bisogny'),
    ('keliandry', 'keliandry'),
    ('kifalaotse', 'kifalaotse'),
    ('kifo', 'kifo'),
    ('kihangy', 'kihangy'),
    ('kikao', 'kikao'),
    ('kikaobalambo', 'kikaobalambo'),
    ('kikaobasy', 'kikaobasy'),
    ('kikaobevolo', 'kikaobevolo'),
    ('kikaomirondra', 'kikaomirondra'),
    ('kikaotsizoaroe', 'kikaotsizoaroe'),
    ('kiko', 'kiko'),
    ('kiky', 'kiky'),
    ('kilavalava', 'kilavalava'),
    ('kililo', 'kililo'),
    ('kiloka', 'kiloka'),
    ('kingotry', 'kingotry'),
    ('kinirike', 'kinirike'),
    ('kiranga', 'kiranga'),
    ('kirangasoratra', 'kirangasoratra'),
    ('kisaka', 'kisaka'),
    ('kisaka_somoy', 'kisaka_somoy'),
    ('kitrangy', 'kitrangy'),
    ('kitrangy_bemaso', 'kitrangy_bemaso'),
    ('kitrangy_bidaharamena', 'kitrangy_bidaharamena'),
    ('kitry', 'kitry'),
    ('koana', 'koana'),
    ('koana_be', 'koana_be'),
    ('kodiva', 'kodiva'),
    ('kodry', 'kodry'),
    ('kofito', 'kofito'),
    ('kojahapa', 'kojahapa'),
    ('kojy', 'kojy'),
    ('kokodro', 'kokodro'),
    ('koloka', 'koloka'),
    ('kolongody', 'kolongody'),
    ('komajiva', 'komajiva'),
    ('kondrokondro', 'kondrokondro'),
    ('kongona', 'kongona'),
    ('kotoalovo', 'kotoalovo'),
    ('kotrokotro', 'kotrokotro'),
    ('krispet', 'krispet'),
    ('labieratse', 'labieratse'),
    ('lafa', 'lafa'),
    ('lafabe', 'lafabe'),
    ('lafadoroko', 'lafadoroko'),
    ('lafavara', 'lafavara'),
    ('lafidaka', 'lafidaka'),
    ('lafo', 'lafo'),
    ('lagnilagny', 'lagnilagny'),
    ('lamatra', 'lamatra'),
    ('lamera', 'lamera'),
    ('lamera_hovohovo', 'lamera_hovohovo'),
    ('lamera_kena', 'lamera_kena'),
    ('lamera_tanampano', 'lamera_tanampano'),
    ('lamera-fotsatsamba', 'lamera-fotsatsamba'),
    ('lamera-tona', 'lamera-tona'),
    ('lamerabadiga', 'lamerabadiga'),
    ('lamilamy', 'lamilamy'),
    ('lamparana', 'lamparana'),
    ('lanelane', 'lanelane'),
    ('langosita', 'langosita'),
    ('langosta', 'langosta'),
    ('langouste', 'langouste'),
    ('lanihieratre', 'lanihieratre'),
    ('lanilany', 'lanilany'),
    ('lanora', 'lanora'),
    ('lanora_boboka', 'lanora_boboka'),
    ('lanora-tona', 'lanora-tona'),
    ('lanoramavony', 'lanoramavony'),
    ('lanorambary', 'lanorambary'),
    ('lanorambe', 'lanorambe'),
    ('lanorambemaso', 'lanorambemaso'),
    ('lanorambena_omby', 'lanorambena_omby'),
    ('lanoramena', 'lanoramena'),
    ('lanorana', 'lanorana'),
    ('lanorana_fisaka', 'lanorana_fisaka'),
    ('lanorandava', 'lanorandava'),
    ('laraby', 'laraby'),
    ('lavaloha', 'lavaloha'),
    ('lavanify', 'lavanify'),
    ('lavao', 'lavao'),
    ('lavarembo', 'lavarembo'),
    ('lavavalaha', 'lavavalaha'),
    ('lavavava', 'lavavava'),
    ('lavitsoy', 'lavitsoy'),
    ('lavoro', 'lavoro'),
    ('lazamanagna', 'lazamanagna'),
    ('lefalefa', 'lefalefa'),
    ('lejaleja', 'lejaleja'),
    ('lemeleme', 'lemeleme'),
    ('lemy', 'lemy'),
    ('lemy_hotsoky', 'lemy_hotsoky'),
    ('leontiny', 'leontiny'),
    ('lily', 'lily'),
    ('logimbato', 'logimbato'),
    ('logy', 'logy'),
    ('lohankaroko', 'lohankaroko'),
    ('lokoahitra', 'lokoahitra'),
    ('lokoahitra_lava', 'lokoahitra_lava'),
    ('lokomena', 'lokomena'),
    ('lokomena_ankoala', 'lokomena_ankoala'),
    ('lokomena_bemaso', 'lokomena_bemaso'),
    ('lombosity', 'lombosity'),
    ('lomena', 'lomena'),
    ('lona', 'lona'),
    ('lotagnony', 'lotagnony'),
    ('lovo', 'lovo'),
    ('lovo-kapoake', 'lovo-kapoake'),
    ('lovobe', 'lovobe'),
    ('lovofisake', 'lovofisake'),
    ('lovohara', 'lovohara'),
    ('lovokabo', 'lovokabo'),
    ('lovokara_mena', 'lovokara_mena'),
    ('lovonakanga', 'lovonakanga'),
    ('lovonangarera', 'lovonangarera'),
    ('madarasy', 'madarasy'),
    ('madrandovoke', 'madrandovoke'),
    ('mafaiky_tay', 'mafaiky_tay'),
    ('mafatsy', 'mafatsy'),
    ('mafihara', 'mafihara'),
    ('mahalogy', 'mahalogy'),
    ('mahaloky', 'mahaloky'),
    ('mahaloky_menarambo', 'mahaloky_menarambo'),
    ('mahatamana', 'mahatamana'),
    ('maheriloha', 'maheriloha'),
    ('mahitsohely', 'mahitsohely'),
    ('maitsovo', 'maitsovo'),
    ('majadovoke', 'majadovoke'),
    ('makamba', 'makamba'),
    ('makoba', 'makoba'),
    ('makro', 'makro'),
    ('malabaro', 'malabaro'),
    ('malika', 'malika'),
    ('malily', 'malily'),
    ('mandraso', 'mandraso'),
    ('mandreandrea', 'mandreandrea'),
    ('mandriandovoke', 'mandriandovoke'),
    ('mandriatongona', 'mandriatongona'),
    ('mangery_lavenoko', 'mangery_lavenoko'),
    ('manjandavake', 'manjandavake'),
    ('manjeanjea', 'manjeanjea'),
    ('mantsignandakana', 'mantsignandakana'),
    ('maronono', 'maronono'),
    ('marononojoby', 'marononojoby'),
    ('marononomavo', 'marononomavo'),
    ('matsiroke', 'matsiroke'),
    ('mavo', 'mavo'),
    ('mavotratra', 'mavotratra'),
    ('menafatsiky', 'menafatsiky'),
    ('menahelika', 'menahelika'),
    ('menaheliky', 'menaheliky'),
    ('menarambo', 'menarambo'),
    ('menasofy', 'menasofy'),
    ('menasogny', 'menasogny'),
    ('menatena', 'menatena'),
    ('menatenda', 'menatenda'),
    ('menavalona', 'menavalona'),
    ('menavava', 'menavava'),
    ('menavolo', 'menavolo'),
    ('merlan', 'merlan'),
    ('miandravolagana', 'miandravolagana'),
    ('mikosa', 'mikosa'),
    ('moanjy', 'moanjy'),
    ('modosy', 'modosy'),
    ('mohajy', 'mohajy'),
    ('mokosa', 'mokosa'),
    ('moloto', 'moloto'),
    ('mondraza', 'mondraza'),
    ('mondrazihoala', 'mondrazihoala'),
    ('mondrazy', 'mondrazy'),
    ('montomaso', 'montomaso'),
    ('montsafa', 'montsafa'),
    ('morajo', 'morajo'),
    ('moramasake', 'moramasake'),
    ('moripa', 'moripa'),
    ('morohobo', 'morohobo'),
    ('moromboho', 'moromboho'),
    ('morongo', 'morongo'),
    ('moroy', 'moroy'),
    ('mosora', 'mosora'),
    ('nanie', 'nanie'),
    ('ndandezo', 'ndandezo'),
    ('olagna', 'olagna'),
    ('ombilahindriake', 'ombilahindriake'),
    ('ongike', 'ongike'),
    ('orana', 'orana'),
    ('orandava', 'orandava'),
    ('orihy', 'orihy'),
    ('orita', 'orita'),
    ('orotsy', 'orotsy'),
    ('pangrora', 'pangrora'),
    ('panisy', 'panisy'),
    ('parakiosoke', 'parakiosoke'),
    ('pasikavaly', 'pasikavaly'),
    ('pepe', 'pepe'),
    ('poantofo', 'poantofo'),
    ('pohana', 'pohana'),
    ('porama', 'porama'),
    ('rabotiky', 'rabotiky'),
    ('ramangataka', 'ramangataka'),
    ('ramanjonina', 'ramanjonina'),
    ('ramanjonitsoratra', 'ramanjonitsoratra'),
    ('ramboly', 'ramboly'),
    ('ramihanina', 'ramihanina'),
    ('rangaromotra', 'rangaromotra'),
    ('rangavanana', 'rangavanana'),
    ('rangoronana', 'rangoronana'),
    ('ranintsepo', 'ranintsepo'),
    ('rarinkina', 'rarinkina'),
    ('rarinkiny', 'rarinkiny'),
    ('rasita', 'rasita'),
    ('regarega', 'regarega'),
    ('rembotitsy', 'rembotitsy'),
    ('renibebotana', 'renibebotana'),
    ('renibekitrangy', 'renibekitrangy'),
    ('renibekoaka', 'renibekoaka'),
    ('renikitrangy', 'renikitrangy'),
    ('requin', 'requin'),
    ('riadriaka', 'riadriaka'),
    ('ronkana', 'ronkana'),
    ('rorohakena', 'rorohakena'),
    ('rotsy', 'rotsy'),
    ('sabatra', 'sabatra'),
    ('sabonto', 'sabonto'),
    ('saempo', 'saempo'),
    ('sahidaly', 'sahidaly'),
    ('sahidaly_goany', 'sahidaly_goany'),
    ('salabaro', 'salabaro'),
    ('salavatraka', 'salavatraka'),
    ('salelo', 'salelo'),
    ('samaitso', 'samaitso'),
    ('samakibana', 'samakibana'),
    ('sampangnohy', 'sampangnohy'),
    ('sampatra', 'sampatra'),
    ('sangaja', 'sangaja'),
    ('sapiata', 'sapiata'),
    ('sardine', 'sardine'),
    ('sardine_mavony', 'sardine_mavony'),
    ('sarendry', 'sarendry'),
    ('sarigeba', 'sarigeba'),
    ('sarobe', 'sarobe'),
    ('saroro', 'saroro'),
    ('sasaka', 'sasaka'),
    ('sasavy', 'sasavy'),
    ('satraka', 'satraka'),
    ('satrily', 'satrily'),
    ('savesave', 'savesave'),
    ('seboto', 'seboto'),
    ('sengo', 'sengo'),
    ('senta', 'senta'),
    ('sibonto', 'sibonto'),
    ('sigalidemera', 'sigalidemera'),
    ('sitilo', 'sitilo'),
    ('soagna', 'soagna'),
    ('soanada', 'soanada'),
    ('sognagna', 'sognagna'),
    ('soke', 'soke'),
    ('sole', 'sole'),
    ('sorikay', 'sorikay'),
    ('soroboa', 'soroboa'),
    ('soronale', 'soronale'),
    ('tabaka', 'tabaka'),
    ('tabakabavy', 'tabakabavy'),
    ('tabaky', 'tabaky'),
    ('tabaky_handa', 'tabaky_handa'),
    ('tabatsoy', 'tabatsoy'),
    ('taboke', 'taboke'),
    ('tabokina', 'tabokina'),
    ('tabololo', 'tabololo'),
    ('tabonoko', 'tabonoko'),
    ('tahake', 'tahake'),
    ('takalo', 'takalo'),
    ('takobato', 'takobato'),
    ('takobatra', 'takobatra'),
    ('takobatrafotsy', 'takobatrafotsy'),
    ('takobatramainty', 'takobatramainty'),
    ('takoropa', 'takoropa'),
    ('talantala', 'talantala'),
    ('talantalagna', 'talantalagna'),
    ('tambokina', 'tambokina'),
    ('tamiro', 'tamiro'),
    ('tamotamosogny', 'tamotamosogny'),
    ('tamporoha', 'tamporoha'),
    ('tanampano', 'tanampano'),
    ('tandraly', 'tandraly'),
    ('tanlantalana', 'tanlantalana'),
    ('taotao', 'taotao'),
    ('tapaporoha', 'tapaporoha'),
    ('taragnilo', 'taragnilo'),
    ('taratake', 'taratake'),
    ('tarovoka', 'tarovoka'),
    ('tatangy', 'tatangy'),
    ('tebokarigny', 'tebokarigny'),
    ('tefo', 'tefo'),
    ('telofehy', 'telofehy'),
    ('temposoka', 'temposoka'),
    ('tendry', 'tendry'),
    ('thon', 'thon'),
    ('thon_jaune', 'thon_jaune'),
    ('tiakatra', 'tiakatra'),
    ('tiriro', 'tiriro'),
    ('tohivarivara', 'tohivarivara'),
    ('toho', 'toho'),
    ('tohobalady', 'tohobalady'),
    ('tohomboza', 'tohomboza'),
    ('tohompasy', 'tohompasy'),
    ('tohonamboa', 'tohonamboa'),
    ('tohonandrongo', 'tohonandrongo'),
    ('tohontsalady', 'tohontsalady'),
    ('tombokafo', 'tombokafo'),
    ('tombonako', 'tombonako'),
    ('tona', 'tona'),
    ('tontraly', 'tontraly'),
    ('torisatrana', 'torisatrana'),
    ('torovoke', 'torovoke'),
    ('torovoko', 'torovoko'),
    ('tretreko', 'tretreko'),
    ('trident', 'trident'),
    ('troidafe', 'troidafe'),
    ('trois_dents', 'trois_dents'),
    ('trois_taches', 'trois_taches'),
    ('tronkena', 'tronkena'),
    ('tsabeaky', 'tsabeaky'),
    ('tsaborokodoy', 'tsaborokodoy'),
    ('tsalo', 'tsalo'),
    ('tsaraby', 'tsaraby'),
    ('tsaramasy', 'tsaramasy'),
    ('tsaramatsiroke', 'tsaramatsiroke'),
    ('tsarasomotra', 'tsarasomotra'),
    ('tsarasoratra', 'tsarasoratra'),
    ('tsatsamba', 'tsatsamba'),
    ('tsenga', 'tsenga'),
    ('tsengatsenga', 'tsengatsenga'),
    ('tserabandagna', 'tserabandagna'),
    ('tseradava', 'tseradava'),
    ('tseradolo', 'tseradolo'),
    ('tseraka', 'tseraka'),
    ('tserakahitra', 'tserakahitra'),
    ('tserapano', 'tserapano'),
    ('tsiazoroa', 'tsiazoroa'),
    ('tsibiraingy', 'tsibiraingy'),
    ('tsigoaka', 'tsigoaka'),
    ('tsihoananindrana', 'tsihoananindrana'),
    ('tsimitombo', 'tsimitombo'),
    ('tsipaosake', 'tsipaosake'),
    ('tsirike', 'tsirike'),
    ('tsiripaosa', 'tsiripaosa'),
    ('tsitsike', 'tsitsike'),
    ('tsivakigny', 'tsivakigny'),
    ('tsivaravara', 'tsivaravara'),
    ('tsoidafy', 'tsoidafy'),
    ('tsoike', 'tsoike'),
    ('tsoiky', 'tsoiky'),
    ('tsoimeareny', 'tsoimeareny'),
    ('tsoimena', 'tsoimena'),
    ('tsoimpoty', 'tsoimpoty'),
    ('tsokahitse', 'tsokahitse'),
    ('tsokena', 'tsokena'),
    ('tsoligny', 'tsoligny'),
    ('tsombantsiaky', 'tsombantsiaky'),
    ('tsontso', 'tsontso'),
    ('tsontsomainty', 'tsontsomainty'),
    ('tsontsondambo', 'tsontsondambo'),
    ('tsoraby', 'tsoraby'),
    ('tsoy', 'tsoy'),
    ('tsoy-mena', 'tsoy-mena'),
    ('vahoho', 'vahoho'),
    ('valala', 'valala'),
    ('valalantay', 'valalantay'),
    ('valalataitse', 'valalataitse'),
    ('valotapaka', 'valotapaka'),
    ('vango', 'vango'),
    ('vao', 'vao'),
    ('vaoho', 'vaoho'),
    ('varavara', 'varavara'),
    ('varavaragna', 'varavaragna'),
    ('varevike', 'varevike'),
    ('varilava', 'varilava'),
    ('varivary', 'varivary'),
    ('vatritra', 'vatritra'),
    ('vatsitsa', 'vatsitsa'),
    ('veraverasony', 'veraverasony'),
    ('vilivary', 'vilivary'),
    ('vogno', 'vogno'),
    ('voitso', 'voitso'),
    ('volomboto', 'volomboto'),
    ('volovo', 'volovo'),
    ('vomonjira', 'vomonjira'),
    ('vontso', 'vontso'),
    ('voramasake', 'voramasake'),
    ('voromandrea', 'voromandrea'),
    ('votosaka', 'votosaka'),
    ('votro', 'votro'),
    ('votro_mena', 'votro_mena'),
    ('votsanja', 'votsanja'),
    ('vozavoza', 'vozavoza'),
    ('zafiliny', 'zafiliny'),
    ('zafiliza', 'zafiliza'),
    ('zanga', 'zanga'),
    ('zangababoke', 'zangababoke'),
    ('zangabenono', 'zangabenono'),
    ('zangadorolisy', 'zangadorolisy'),
    ('zangafoty', 'zangafoty'),
    ('zangajobe', 'zangajobe'),
    ('zangajomal', 'zangajomal'),
    ('zangambato', 'zangambato'),
    ('zangapitike', 'zangapitike'),
    ('zangaroroha', 'zangaroroha'),
    ('zangastylo', 'zangastylo'),
    ('zangatarike', 'zangatarike'),
    ('zangatrakitera', 'zangatrakitera'),
    ('zangatrokena', 'zangatrokena'),
    ('zangatsokena', 'zangatsokena'),
    ('zavavy_avaratra', 'zavavy_avaratra'),
    ('zazamanango', 'zazamanango')
) AS [Source] (WCSPROGRAMS_FishExtCode, WCSPROGRAMS_FishName) ON [Target].WCSPROGRAMS_FishExtCode = [Source].WCSPROGRAMS_FishExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_FishExtCode = [Source].WCSPROGRAMS_FishExtCode,
  [Target].WCSPROGRAMS_FishName = [Source].WCSPROGRAMS_FishName
  WHEN NOT MATCHED THEN
INSERT
  (WCSPROGRAMS_FishExtCode, WCSPROGRAMS_FishName)
VALUES
  (
    [Source].WCSPROGRAMS_FishExtCode,
    [Source].WCSPROGRAMS_FishName
  );

MERGE WCSPROGRAMS_Vendor AS [Target] USING (
  VALUES
    ('collector', 'collector'),
    ('fisherman', 'fisherman'),
    ('transporter', 'transporter'),
    ('wholesaler', 'wholesaler'),
    ('other_vendor', 'other_vendor')
) AS [Source] (
  WCSPROGRAMS_VendorExtCode,
  WCSPROGRAMS_VendorName
) ON [Target].WCSPROGRAMS_VendorExtCode = [Source].WCSPROGRAMS_VendorExtCode
WHEN MATCHED THEN
UPDATE
SET
  [Target].WCSPROGRAMS_VendorExtCode = [Source].WCSPROGRAMS_VendorExtCode,
  [Target].WCSPROGRAMS_VendorName = [Source].WCSPROGRAMS_VendorName
  WHEN NOT MATCHED THEN
INSERT
  (
    WCSPROGRAMS_VendorExtCode,
    WCSPROGRAMS_VendorName
  )
VALUES
  (
    [Source].WCSPROGRAMS_VendorExtCode,
    [Source].WCSPROGRAMS_VendorName
  );