SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_surveytype'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Surveytype (
        WCSPROGRAMS_SurveytypeID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SurveytypeName nvarchar(100)    NOT NULL, WCSPROGRAMS_SurveytypeExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_SurveytypeCode nvarchar(255)    , WCSPROGRAMS_SurveytypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Surveytype WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Surveytype_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Surveytype CHECK CONSTRAINT FK_WCSPROGRAMS_Surveytype_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Surveytype WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Surveytype_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Surveytype CHECK CONSTRAINT FK_WCSPROGRAMS_Surveytype_SecuritySettingID_Row;
                  
                
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
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_district'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_District (
        WCSPROGRAMS_DistrictID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_DistrictName nvarchar(100)    NOT NULL, WCSPROGRAMS_DistrictExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_DistrictCode nvarchar(255)    , WCSPROGRAMS_DistrictDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_District WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_District_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_District CHECK CONSTRAINT FK_WCSPROGRAMS_District_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_District WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_District_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_District CHECK CONSTRAINT FK_WCSPROGRAMS_District_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_survey'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Survey (
        WCSPROGRAMS_SurveyID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SurveyName nvarchar(100)    NOT NULL, WCSPROGRAMS_SurveyExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_SurveyCode nvarchar(255)    , WCSPROGRAMS_SurveyDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Survey WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Survey_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Survey CHECK CONSTRAINT FK_WCSPROGRAMS_Survey_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Survey WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Survey_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Survey CHECK CONSTRAINT FK_WCSPROGRAMS_Survey_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_site'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Site (
        WCSPROGRAMS_SiteID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SiteName nvarchar(100)    NOT NULL, WCSPROGRAMS_SiteExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_SiteCode nvarchar(255)    , WCSPROGRAMS_SiteDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Site WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Site_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Site CHECK CONSTRAINT FK_WCSPROGRAMS_Site_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Site WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Site_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Site CHECK CONSTRAINT FK_WCSPROGRAMS_Site_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_market'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Market (
        WCSPROGRAMS_MarketID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_MarketName nvarchar(100)    NOT NULL, WCSPROGRAMS_MarketExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_MarketCode nvarchar(255)    , WCSPROGRAMS_MarketDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Market WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Market_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Market CHECK CONSTRAINT FK_WCSPROGRAMS_Market_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Market WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Market_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Market CHECK CONSTRAINT FK_WCSPROGRAMS_Market_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_surveyor'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Surveyor (
        WCSPROGRAMS_SurveyorID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_SurveyorName nvarchar(100)    , WCSPROGRAMS_SurveyorExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_SurveyorCode nvarchar(255)    , WCSPROGRAMS_SurveyorDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Surveyor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Surveyor_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Surveyor CHECK CONSTRAINT FK_WCSPROGRAMS_Surveyor_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Surveyor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Surveyor_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Surveyor CHECK CONSTRAINT FK_WCSPROGRAMS_Surveyor_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_yesno'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Yesno (
        WCSPROGRAMS_YesnoID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_YesnoName nvarchar(100)    , WCSPROGRAMS_YesnoExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_YesnoCode nvarchar(255)    , WCSPROGRAMS_YesnoDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Yesno WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Yesno_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Yesno CHECK CONSTRAINT FK_WCSPROGRAMS_Yesno_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Yesno WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Yesno_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Yesno CHECK CONSTRAINT FK_WCSPROGRAMS_Yesno_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_boat'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Boat (
        WCSPROGRAMS_BoatID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_BoatName nvarchar(100)    NOT NULL, WCSPROGRAMS_BoatExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_BoatCode nvarchar(255)    , WCSPROGRAMS_BoatDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Boat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Boat_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Boat CHECK CONSTRAINT FK_WCSPROGRAMS_Boat_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Boat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Boat_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Boat CHECK CONSTRAINT FK_WCSPROGRAMS_Boat_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_gear'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Gear (
        WCSPROGRAMS_GearID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_GearName nvarchar(100)    , WCSPROGRAMS_GearExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_GearCode nvarchar(255)    , WCSPROGRAMS_GearDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Gear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Gear_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Gear CHECK CONSTRAINT FK_WCSPROGRAMS_Gear_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Gear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Gear_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Gear CHECK CONSTRAINT FK_WCSPROGRAMS_Gear_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_unit'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Unit (
        WCSPROGRAMS_UnitID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_UnitName nvarchar(100)    , WCSPROGRAMS_UnitExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_UnitCode nvarchar(255)    , WCSPROGRAMS_UnitDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Unit WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Unit_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Unit CHECK CONSTRAINT FK_WCSPROGRAMS_Unit_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Unit WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Unit_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Unit CHECK CONSTRAINT FK_WCSPROGRAMS_Unit_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_habitat'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Habitat (
        WCSPROGRAMS_HabitatID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_HabitatName nvarchar(100)    NOT NULL, WCSPROGRAMS_HabitatExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_HabitatCode nvarchar(255)    , WCSPROGRAMS_HabitatDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Habitat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Habitat_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Habitat CHECK CONSTRAINT FK_WCSPROGRAMS_Habitat_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Habitat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Habitat_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Habitat CHECK CONSTRAINT FK_WCSPROGRAMS_Habitat_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_type'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Type (
        WCSPROGRAMS_TypeID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_TypeName nvarchar(100)    NOT NULL, WCSPROGRAMS_TypeExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_TypeCode nvarchar(255)    , WCSPROGRAMS_TypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Type WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Type_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Type CHECK CONSTRAINT FK_WCSPROGRAMS_Type_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Type WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Type_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Type CHECK CONSTRAINT FK_WCSPROGRAMS_Type_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_genus'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Genus (
        WCSPROGRAMS_GenusID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_GenusName nvarchar(100)    NOT NULL, WCSPROGRAMS_GenusExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_GenusCode nvarchar(255)    , WCSPROGRAMS_GenusDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Genus WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Genus_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Genus CHECK CONSTRAINT FK_WCSPROGRAMS_Genus_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Genus WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Genus_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Genus CHECK CONSTRAINT FK_WCSPROGRAMS_Genus_SecuritySettingID_Row;
                  
                
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
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sex'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Sex (
        WCSPROGRAMS_SexID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SexName nvarchar(100)    NOT NULL, WCSPROGRAMS_SexExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_SexCode nvarchar(255)    , WCSPROGRAMS_SexDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Sex WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Sex_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Sex CHECK CONSTRAINT FK_WCSPROGRAMS_Sex_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Sex WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Sex_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Sex CHECK CONSTRAINT FK_WCSPROGRAMS_Sex_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_fish'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Fish (
        WCSPROGRAMS_FishID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_FishName nvarchar(100)    NOT NULL, WCSPROGRAMS_FishExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_FishCode nvarchar(255)    , WCSPROGRAMS_FishDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Fish WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Fish_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Fish CHECK CONSTRAINT FK_WCSPROGRAMS_Fish_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Fish WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Fish_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Fish CHECK CONSTRAINT FK_WCSPROGRAMS_Fish_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_vendor'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Vendor (
        WCSPROGRAMS_VendorID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_VendorName nvarchar(100)    NOT NULL, WCSPROGRAMS_VendorExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_VendorCode nvarchar(255)    , WCSPROGRAMS_VendorDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Vendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Vendor_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Vendor CHECK CONSTRAINT FK_WCSPROGRAMS_Vendor_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Vendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Vendor_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Vendor CHECK CONSTRAINT FK_WCSPROGRAMS_Vendor_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_kobodataset'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_KoboDataset (
        FormName nvarchar(max)    , DatasetId nvarchar(100)  UNIQUE  , LastUpdated datetime DEFAULT GETDATE()   , WCSPROGRAMS_KoboDatasetID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_KoboDatasetName nvarchar(255)    , WCSPROGRAMS_KoboDatasetExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_KoboDatasetCode nvarchar(255)    , WCSPROGRAMS_KoboDatasetDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_KoboDataset WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_KoboDataset_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_KoboDataset CHECK CONSTRAINT FK_WCSPROGRAMS_KoboDataset_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_KoboDataset WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_KoboDataset_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_KoboDataset CHECK CONSTRAINT FK_WCSPROGRAMS_KoboDataset_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksrays'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRays (
        Verification nvarchar(max)    , SharkRayVendorsNb int    NOT NULL, Consent nvarchar(max)    , Pic3 nvarchar(max)    , Pic2 nvarchar(max)    , Pic1 nvarchar(max)    , WCSPROGRAMS_Surveyor_SurveyorID int    , WCSPROGRAMS_Market_MarketID int    NOT NULL, WCSPROGRAMS_Site_LandingSiteID int    NOT NULL, WCSPROGRAMS_Survey_SurveyID int    NOT NULL, WCSPROGRAMS_District_DistrictID int    NOT NULL, WCSPROGRAMS_Country_CountryID int    NOT NULL, Gps nvarchar(max)    , WCSPROGRAMS_Surveytype_SurveyTypeID int    NOT NULL, Deviceid nvarchar(max)    , FormDateEnd date    , Start date    , Today date    , Latitude float    , Longitude float    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , Payload nvarchar(max)    , WCSPROGRAMS_SharksRaysID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SharksRaysName nvarchar(255)    , WCSPROGRAMS_SharksRaysExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_SharksRaysCode nvarchar(255)    , WCSPROGRAMS_SharksRaysDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_Surveyor_SurveyorID FOREIGN KEY (WCSPROGRAMS_Surveyor_SurveyorID)
                      REFERENCES WCSPROGRAMS_Surveyor (WCSPROGRAMS_SurveyorID);
                      ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_Surveyor_SurveyorID;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_Market_MarketID FOREIGN KEY (WCSPROGRAMS_Market_MarketID)
                      REFERENCES WCSPROGRAMS_Market (WCSPROGRAMS_MarketID);
                      ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_Market_MarketID;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_Site_LandingSiteID FOREIGN KEY (WCSPROGRAMS_Site_LandingSiteID)
                      REFERENCES WCSPROGRAMS_Site (WCSPROGRAMS_SiteID);
                      ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_Site_LandingSiteID;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_Survey_SurveyID FOREIGN KEY (WCSPROGRAMS_Survey_SurveyID)
                      REFERENCES WCSPROGRAMS_Survey (WCSPROGRAMS_SurveyID);
                      ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_Survey_SurveyID;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_District_DistrictID FOREIGN KEY (WCSPROGRAMS_District_DistrictID)
                      REFERENCES WCSPROGRAMS_District (WCSPROGRAMS_DistrictID);
                      ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_District_DistrictID;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_Country_CountryID FOREIGN KEY (WCSPROGRAMS_Country_CountryID)
                      REFERENCES WCSPROGRAMS_Country (WCSPROGRAMS_CountryID);
                      ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_Country_CountryID;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_Surveytype_SurveyTypeID FOREIGN KEY (WCSPROGRAMS_Surveytype_SurveyTypeID)
                      REFERENCES WCSPROGRAMS_Surveytype (WCSPROGRAMS_SurveytypeID);
                      ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_Surveytype_SurveyTypeID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksrayssales'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRaysSales (
        WCSPROGRAMS_Type_STypeID int    NOT NULL, WCSPROGRAMS_Genus_SGenusID int    NOT NULL, WCSPROGRAMS_Species_SSpeciesID int    , SPic4 nvarchar(max)    NOT NULL, SPic5 nvarchar(max)    NOT NULL, SPic6 nvarchar(max)    NOT NULL, SPic7 nvarchar(max)    NOT NULL, SPic8 nvarchar(max)    NOT NULL, SPic9 nvarchar(max)    NOT NULL, SPic10 nvarchar(max)    NOT NULL, SPic11 nvarchar(max)    NOT NULL, SPic12 nvarchar(max)    , SLocalName nvarchar(max)    NOT NULL, WCSPROGRAMS_Sex_SSexID int    NOT NULL, SWeight float    NOT NULL, SDiscWidth float    NOT NULL, SDiscLength float    NOT NULL, STotalLength float    NOT NULL, SPrecaudalLength float    NOT NULL, SForkLength float    NOT NULL, SCarapaceLength int    NOT NULL, SCarapaceWidth int    NOT NULL, SGearType nvarchar(max)    NOT NULL, SGearTypeOther nvarchar(max)    NOT NULL, WCSPROGRAMS_Yesno_SDnaSampleCollectedID int    NOT NULL, SDnaCode nvarchar(max)    NOT NULL, SPriceSoldFor int    NOT NULL, SPriceSoldUsd nvarchar(100)    , SComment nvarchar(max)    , VendorUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_SalesID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SalesName nvarchar(255)    , WCSPROGRAMS_SalesExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_SalesCode nvarchar(255)    , WCSPROGRAMS_SalesDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID)
                      REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SharksRaysID;
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_Type_STypeID FOREIGN KEY (WCSPROGRAMS_Type_STypeID)
                      REFERENCES WCSPROGRAMS_Type (WCSPROGRAMS_TypeID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_Type_STypeID;
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_Genus_SGenusID FOREIGN KEY (WCSPROGRAMS_Genus_SGenusID)
                      REFERENCES WCSPROGRAMS_Genus (WCSPROGRAMS_GenusID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_Genus_SGenusID;
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_Species_SSpeciesID FOREIGN KEY (WCSPROGRAMS_Species_SSpeciesID)
                      REFERENCES WCSPROGRAMS_Species (WCSPROGRAMS_SpeciesID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_Species_SSpeciesID;
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_Sex_SSexID FOREIGN KEY (WCSPROGRAMS_Sex_SSexID)
                      REFERENCES WCSPROGRAMS_Sex (WCSPROGRAMS_SexID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_Sex_SSexID;
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_Yesno_SDnaSampleCollectedID FOREIGN KEY (WCSPROGRAMS_Yesno_SDnaSampleCollectedID)
                      REFERENCES WCSPROGRAMS_Yesno (WCSPROGRAMS_YesnoID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_Yesno_SDnaSampleCollectedID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksraysvendor'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRaysVendor (
        WCSPROGRAMS_Sex_VendorSexID int    NOT NULL, WhenLastSellSharkRay nvarchar(max)    NOT NULL, WCSPROGRAMS_Vendor_WhereBoughtID int    NOT NULL, WCSPROGRAMS_Vendor_WhoSoldToID int    NOT NULL, WhoSoldOther nvarchar(max)    NOT NULL, SharksraysUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_VendorID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_VendorName nvarchar(255)    , WCSPROGRAMS_VendorExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_VendorCode nvarchar(255)    , WCSPROGRAMS_VendorDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SharksRaysVendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SharksRaysVendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SharksRaysVendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID)
                      REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_SharksRaysID;
ALTER TABLE WCSPROGRAMS_SharksRaysVendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_Sex_VendorSexID FOREIGN KEY (WCSPROGRAMS_Sex_VendorSexID)
                      REFERENCES WCSPROGRAMS_Sex (WCSPROGRAMS_SexID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_Sex_VendorSexID;
ALTER TABLE WCSPROGRAMS_SharksRaysVendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_Vendor_WhereBoughtID FOREIGN KEY (WCSPROGRAMS_Vendor_WhereBoughtID)
                      REFERENCES WCSPROGRAMS_Vendor (WCSPROGRAMS_VendorID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_Vendor_WhereBoughtID;
ALTER TABLE WCSPROGRAMS_SharksRaysVendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_Vendor_WhoSoldToID FOREIGN KEY (WCSPROGRAMS_Vendor_WhoSoldToID)
                      REFERENCES WCSPROGRAMS_Vendor (WCSPROGRAMS_VendorID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_Vendor_WhoSoldToID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksrayssample'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRaysSample (
        FishLength float    , FishWeight float    , FishCatchUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_SampleID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SampleName nvarchar(255)    , WCSPROGRAMS_SampleExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_SampleCode nvarchar(255)    , WCSPROGRAMS_SampleDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SharksRaysSample WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysSample CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SharksRaysSample WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysSample CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SharksRaysSample WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID)
                      REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysSample CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_WCSPROGRAMS_SharksRaysID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksraysfishcatch'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRaysFishCatch (
        WCSPROGRAMS_Fish_FishSpecieID int    NOT NULL, NbObserved int    NOT NULL, TotalWeightFish int    NOT NULL, FishPartConsumed int    NOT NULL, FishPriceKg int    NOT NULL, FishPriceSoldUsd nvarchar(100)    , BoatUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_FishCatchID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_FishCatchName nvarchar(255)    , WCSPROGRAMS_FishCatchExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_FishCatchCode nvarchar(255)    , WCSPROGRAMS_FishCatchDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID)
                      REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_WCSPROGRAMS_SharksRaysID;
ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_WCSPROGRAMS_Fish_FishSpecieID FOREIGN KEY (WCSPROGRAMS_Fish_FishSpecieID)
                      REFERENCES WCSPROGRAMS_Fish (WCSPROGRAMS_FishID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_WCSPROGRAMS_Fish_FishSpecieID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksrayscatchdetails'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRaysCatchDetails (
        WCSPROGRAMS_Type_TypeID int    NOT NULL, WCSPROGRAMS_Genus_GenusID int    NOT NULL, WCSPROGRAMS_Species_SpeciesID int    , LocalName nvarchar(max)    NOT NULL, WCSPROGRAMS_Sex_SexID int    NOT NULL, Weight float    NOT NULL, DiscWidth float    NOT NULL, DiscLength float    NOT NULL, TotalLength float    NOT NULL, ForkLength float    NOT NULL, PrecaudalLength float    NOT NULL, Pic4 nvarchar(max)    NOT NULL, Pic5 nvarchar(max)    NOT NULL, Pic6 nvarchar(max)    NOT NULL, Pic7 nvarchar(max)    NOT NULL, Pic8 nvarchar(max)    NOT NULL, Pic9 nvarchar(max)    NOT NULL, Pic10 nvarchar(max)    , Pic11 nvarchar(max)    , Pic12 nvarchar(max)    , GearType nvarchar(max)    NOT NULL, GearTypeOther nvarchar(max)    NOT NULL, WCSPROGRAMS_Yesno_DnaSampleCollectedID int    NOT NULL, DnaCode nvarchar(max)    NOT NULL, PriceSoldFor int    NOT NULL, PriceSoldUsd nvarchar(100)    , Comment nvarchar(max)    , BoatUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_CatchDetailsID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_CatchDetailsName nvarchar(255)    , WCSPROGRAMS_CatchDetailsExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_CatchDetailsCode nvarchar(255)    , WCSPROGRAMS_CatchDetailsDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID)
                      REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_SharksRaysID;
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_Type_TypeID FOREIGN KEY (WCSPROGRAMS_Type_TypeID)
                      REFERENCES WCSPROGRAMS_Type (WCSPROGRAMS_TypeID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_Type_TypeID;
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_Genus_GenusID FOREIGN KEY (WCSPROGRAMS_Genus_GenusID)
                      REFERENCES WCSPROGRAMS_Genus (WCSPROGRAMS_GenusID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_Genus_GenusID;
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_Species_SpeciesID FOREIGN KEY (WCSPROGRAMS_Species_SpeciesID)
                      REFERENCES WCSPROGRAMS_Species (WCSPROGRAMS_SpeciesID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_Species_SpeciesID;
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_Sex_SexID FOREIGN KEY (WCSPROGRAMS_Sex_SexID)
                      REFERENCES WCSPROGRAMS_Sex (WCSPROGRAMS_SexID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_Sex_SexID;
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_Yesno_DnaSampleCollectedID FOREIGN KEY (WCSPROGRAMS_Yesno_DnaSampleCollectedID)
                      REFERENCES WCSPROGRAMS_Yesno (WCSPROGRAMS_YesnoID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_Yesno_DnaSampleCollectedID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksraysboat'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRaysBoat (
        WCSPROGRAMS_Yesno_BoatInfoID int    , WCSPROGRAMS_Boat_BoatTypeID int    NOT NULL, OtherBoat nvarchar(max)    NOT NULL, Crew int    NOT NULL, WomenCrew int    NOT NULL, Engine int    NOT NULL, WCSPROGRAMS_Gear_PrimaryGearID int    , PrimaryNetType nvarchar(max)    NOT NULL, PrimaryLineType nvarchar(max)    NOT NULL, PrimaryOtherType nvarchar(max)    NOT NULL, PrimaryGearLocalName nvarchar(max)    NOT NULL, PrimaryNetLength int    NOT NULL, PrimaryNetHeight int    NOT NULL, PrimaryMeshSize int    NOT NULL, WCSPROGRAMS_Unit_PrimaryMeshSizeUnitID int    , PrimaryLinesNb int    NOT NULL, PrimaryHooksNb int    NOT NULL, PrimaryHookSize nvarchar(max)    NOT NULL, WCSPROGRAMS_Gear_SecondaryGearID int    , SecondaryNetType nvarchar(max)    NOT NULL, SecondaryLineType nvarchar(max)    NOT NULL, SecondaryOtherType nvarchar(max)    NOT NULL, SecondaryGearLocalName nvarchar(max)    NOT NULL, SecondaryNetLength int    NOT NULL, SecondaryNetHeight int    NOT NULL, SecondaryMeshSize int    NOT NULL, WCSPROGRAMS_Unit_SecondaryMeshSizeUnitID int    , SecondaryLinesNb int    NOT NULL, SecondaryHooksNb int    NOT NULL, SecondaryHookSize nvarchar(max)    NOT NULL, FishingLocation nvarchar(max)    NOT NULL, FishingDepth int    NOT NULL, WCSPROGRAMS_Habitat_FishingHabitatID int    NOT NULL, OtherHabitat nvarchar(max)    NOT NULL, DistanceSite nvarchar(max)    NOT NULL, FishingStart nvarchar(max)    , FishingEnd nvarchar(max)    , FishingTime int    , TravelTime int    NOT NULL, NbBoats int    NOT NULL, WCSPROGRAMS_Yesno_TargetedID int    NOT NULL, LastCatchSharkRay nvarchar(max)    NOT NULL, WCSPROGRAMS_Yesno_ReleaseSharkRayID int    NOT NULL, PercentEat int    NOT NULL, PercentSell int    NOT NULL, PercentGive int    NOT NULL, WhereSellFins nvarchar(max)    NOT NULL, WhereSellMeat nvarchar(max)    NOT NULL, WhereSellOil nvarchar(max)    NOT NULL, FinsPrice int    NOT NULL, FinsPriceUsd nvarchar(100)    , MeatPrice int    NOT NULL, MeatPriceUsd nvarchar(100)    , OilPrice int    NOT NULL, OilPriceUsd nvarchar(100)    , NbSharksUnsampled int    NOT NULL, NbRaysUnsampled int    NOT NULL, NbSharkLikeRaysUnsampled int    NOT NULL, SharksraysUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_BoatID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_BoatName nvarchar(255)    , WCSPROGRAMS_BoatExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_BoatCode nvarchar(255)    , WCSPROGRAMS_BoatDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID)
                      REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_SharksRaysID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Yesno_BoatInfoID FOREIGN KEY (WCSPROGRAMS_Yesno_BoatInfoID)
                      REFERENCES WCSPROGRAMS_Yesno (WCSPROGRAMS_YesnoID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Yesno_BoatInfoID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Boat_BoatTypeID FOREIGN KEY (WCSPROGRAMS_Boat_BoatTypeID)
                      REFERENCES WCSPROGRAMS_Boat (WCSPROGRAMS_BoatID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Boat_BoatTypeID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Gear_PrimaryGearID FOREIGN KEY (WCSPROGRAMS_Gear_PrimaryGearID)
                      REFERENCES WCSPROGRAMS_Gear (WCSPROGRAMS_GearID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Gear_PrimaryGearID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Unit_PrimaryMeshSizeUnitID FOREIGN KEY (WCSPROGRAMS_Unit_PrimaryMeshSizeUnitID)
                      REFERENCES WCSPROGRAMS_Unit (WCSPROGRAMS_UnitID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Unit_PrimaryMeshSizeUnitID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Gear_SecondaryGearID FOREIGN KEY (WCSPROGRAMS_Gear_SecondaryGearID)
                      REFERENCES WCSPROGRAMS_Gear (WCSPROGRAMS_GearID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Gear_SecondaryGearID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Unit_SecondaryMeshSizeUnitID FOREIGN KEY (WCSPROGRAMS_Unit_SecondaryMeshSizeUnitID)
                      REFERENCES WCSPROGRAMS_Unit (WCSPROGRAMS_UnitID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Unit_SecondaryMeshSizeUnitID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Habitat_FishingHabitatID FOREIGN KEY (WCSPROGRAMS_Habitat_FishingHabitatID)
                      REFERENCES WCSPROGRAMS_Habitat (WCSPROGRAMS_HabitatID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Habitat_FishingHabitatID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Yesno_TargetedID FOREIGN KEY (WCSPROGRAMS_Yesno_TargetedID)
                      REFERENCES WCSPROGRAMS_Yesno (WCSPROGRAMS_YesnoID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Yesno_TargetedID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Yesno_ReleaseSharkRayID FOREIGN KEY (WCSPROGRAMS_Yesno_ReleaseSharkRayID)
                      REFERENCES WCSPROGRAMS_Yesno (WCSPROGRAMS_YesnoID);
                      ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_Yesno_ReleaseSharkRayID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_salesgear'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SalesGear (
        WCSPROGRAMS_GearID int    NOT NULL, WCSPROGRAMS_SalesID int    NOT NULL, WCSPROGRAMS_SGearTypeName nvarchar(255)    , WCSPROGRAMS_SGearTypeExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_SGearTypeCode nvarchar(255)    , WCSPROGRAMS_SGearTypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SalesGear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SalesGear_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SalesGear CHECK CONSTRAINT FK_WCSPROGRAMS_SalesGear_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SalesGear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SalesGear_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SalesGear CHECK CONSTRAINT FK_WCSPROGRAMS_SalesGear_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SalesGear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SalesGear_WCSPROGRAMS_GearID FOREIGN KEY (WCSPROGRAMS_GearID)
                      REFERENCES WCSPROGRAMS_Gear (WCSPROGRAMS_GearID);
                      ALTER TABLE WCSPROGRAMS_SalesGear CHECK CONSTRAINT FK_WCSPROGRAMS_SalesGear_WCSPROGRAMS_GearID;
ALTER TABLE WCSPROGRAMS_SalesGear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SalesGear_WCSPROGRAMS_SalesID FOREIGN KEY (WCSPROGRAMS_SalesID)
                      REFERENCES WCSPROGRAMS_SharksRaysSales (WCSPROGRAMS_SalesID);
                      ALTER TABLE WCSPROGRAMS_SalesGear CHECK CONSTRAINT FK_WCSPROGRAMS_SalesGear_WCSPROGRAMS_SalesID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_catchdetailsgear'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_CatchDetailsGear (
        WCSPROGRAMS_GearID int    NOT NULL, WCSPROGRAMS_CatchDetailsID int    NOT NULL, WCSPROGRAMS_GearTypeName nvarchar(255)    , WCSPROGRAMS_GearTypeExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_GearTypeCode nvarchar(255)    , WCSPROGRAMS_GearTypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_CatchDetailsGear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGear_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_CatchDetailsGear CHECK CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGear_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_CatchDetailsGear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGear_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_CatchDetailsGear CHECK CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGear_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_CatchDetailsGear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGear_WCSPROGRAMS_GearID FOREIGN KEY (WCSPROGRAMS_GearID)
                      REFERENCES WCSPROGRAMS_Gear (WCSPROGRAMS_GearID);
                      ALTER TABLE WCSPROGRAMS_CatchDetailsGear CHECK CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGear_WCSPROGRAMS_GearID;
ALTER TABLE WCSPROGRAMS_CatchDetailsGear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGear_WCSPROGRAMS_CatchDetailsID FOREIGN KEY (WCSPROGRAMS_CatchDetailsID)
                      REFERENCES WCSPROGRAMS_SharksRaysCatchDetails (WCSPROGRAMS_CatchDetailsID);
                      ALTER TABLE WCSPROGRAMS_CatchDetailsGear CHECK CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGear_WCSPROGRAMS_CatchDetailsID;
