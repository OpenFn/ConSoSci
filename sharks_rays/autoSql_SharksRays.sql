SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_surveytype'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SurveyType (
        WCSPROGRAMS_SurveyTypeID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_SurveyTypeName nvarchar(100)    , WCSPROGRAMS_SurveyTypeExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_SurveyTypeCode nvarchar(255)    , WCSPROGRAMS_SurveyTypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SurveyType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SurveyType_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SurveyType CHECK CONSTRAINT FK_WCSPROGRAMS_SurveyType_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SurveyType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SurveyType_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SurveyType CHECK CONSTRAINT FK_WCSPROGRAMS_SurveyType_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_country'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Country (
        WCSPROGRAMS_CountryID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_CountryName nvarchar(100)    , WCSPROGRAMS_CountryExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_CountryCode nvarchar(255)    , WCSPROGRAMS_CountryDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
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
        WCSPROGRAMS_DistrictID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_DistrictName nvarchar(100)    , WCSPROGRAMS_DistrictExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_DistrictCode nvarchar(255)    , WCSPROGRAMS_DistrictDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
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
        WCSPROGRAMS_SurveyID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_SurveyName nvarchar(100)    , WCSPROGRAMS_SurveyExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_SurveyCode nvarchar(255)    , WCSPROGRAMS_SurveyDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Survey WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Survey_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Survey CHECK CONSTRAINT FK_WCSPROGRAMS_Survey_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Survey WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Survey_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Survey CHECK CONSTRAINT FK_WCSPROGRAMS_Survey_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_landingsite'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_LandingSite (
        WCSPROGRAMS_LandingSiteID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_LandingSiteName nvarchar(100)    , WCSPROGRAMS_LandingSiteExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_LandingSiteCode nvarchar(255)    , WCSPROGRAMS_LandingSiteDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_LandingSite WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_LandingSite_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_LandingSite CHECK CONSTRAINT FK_WCSPROGRAMS_LandingSite_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_LandingSite WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_LandingSite_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_LandingSite CHECK CONSTRAINT FK_WCSPROGRAMS_LandingSite_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_market'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Market (
        WCSPROGRAMS_MarketID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_MarketName nvarchar(100)    , WCSPROGRAMS_MarketExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_MarketCode nvarchar(255)    , WCSPROGRAMS_MarketDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
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
          WHERE table_name = 'wcsprograms_boatinfo'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_BoatInfo (
        WCSPROGRAMS_BoatInfoID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_BoatInfoName nvarchar(100)    , WCSPROGRAMS_BoatInfoExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_BoatInfoCode nvarchar(255)    , WCSPROGRAMS_BoatInfoDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_BoatInfo WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_BoatInfo_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_BoatInfo CHECK CONSTRAINT FK_WCSPROGRAMS_BoatInfo_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_BoatInfo WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_BoatInfo_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_BoatInfo CHECK CONSTRAINT FK_WCSPROGRAMS_BoatInfo_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_boattype'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_BoatType (
        WCSPROGRAMS_BoatTypeID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_BoatTypeName nvarchar(100)    , WCSPROGRAMS_BoatTypeExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_BoatTypeCode nvarchar(255)    , WCSPROGRAMS_BoatTypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_BoatType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_BoatType_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_BoatType CHECK CONSTRAINT FK_WCSPROGRAMS_BoatType_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_BoatType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_BoatType_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_BoatType CHECK CONSTRAINT FK_WCSPROGRAMS_BoatType_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_primarygear'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_PrimaryGear (
        WCSPROGRAMS_PrimaryGearID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_PrimaryGearName nvarchar(100)    , WCSPROGRAMS_PrimaryGearExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_PrimaryGearCode nvarchar(255)    , WCSPROGRAMS_PrimaryGearDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_PrimaryGear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_PrimaryGear_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_PrimaryGear CHECK CONSTRAINT FK_WCSPROGRAMS_PrimaryGear_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_PrimaryGear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_PrimaryGear_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_PrimaryGear CHECK CONSTRAINT FK_WCSPROGRAMS_PrimaryGear_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_primarymeshsizeunit'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_PrimaryMeshSizeUnit (
        WCSPROGRAMS_PrimaryMeshSizeUnitID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_PrimaryMeshSizeUnitName nvarchar(100)    , WCSPROGRAMS_PrimaryMeshSizeUnitExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_PrimaryMeshSizeUnitCode nvarchar(255)    , WCSPROGRAMS_PrimaryMeshSizeUnitDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_PrimaryMeshSizeUnit WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_PrimaryMeshSizeUnit_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_PrimaryMeshSizeUnit CHECK CONSTRAINT FK_WCSPROGRAMS_PrimaryMeshSizeUnit_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_PrimaryMeshSizeUnit WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_PrimaryMeshSizeUnit_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_PrimaryMeshSizeUnit CHECK CONSTRAINT FK_WCSPROGRAMS_PrimaryMeshSizeUnit_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_secondarygear'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SecondaryGear (
        WCSPROGRAMS_SecondaryGearID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_SecondaryGearName nvarchar(100)    , WCSPROGRAMS_SecondaryGearExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_SecondaryGearCode nvarchar(255)    , WCSPROGRAMS_SecondaryGearDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SecondaryGear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SecondaryGear_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SecondaryGear CHECK CONSTRAINT FK_WCSPROGRAMS_SecondaryGear_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SecondaryGear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SecondaryGear_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SecondaryGear CHECK CONSTRAINT FK_WCSPROGRAMS_SecondaryGear_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_secondarymeshsizeunit'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SecondaryMeshSizeUnit (
        WCSPROGRAMS_SecondaryMeshSizeUnitID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_SecondaryMeshSizeUnitName nvarchar(100)    , WCSPROGRAMS_SecondaryMeshSizeUnitExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_SecondaryMeshSizeUnitCode nvarchar(255)    , WCSPROGRAMS_SecondaryMeshSizeUnitDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SecondaryMeshSizeUnit WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SecondaryMeshSizeUnit_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SecondaryMeshSizeUnit CHECK CONSTRAINT FK_WCSPROGRAMS_SecondaryMeshSizeUnit_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SecondaryMeshSizeUnit WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SecondaryMeshSizeUnit_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SecondaryMeshSizeUnit CHECK CONSTRAINT FK_WCSPROGRAMS_SecondaryMeshSizeUnit_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_fishinghabitat'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_FishingHabitat (
        WCSPROGRAMS_FishingHabitatID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_FishingHabitatName nvarchar(100)    , WCSPROGRAMS_FishingHabitatExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_FishingHabitatCode nvarchar(255)    , WCSPROGRAMS_FishingHabitatDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_FishingHabitat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_FishingHabitat_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_FishingHabitat CHECK CONSTRAINT FK_WCSPROGRAMS_FishingHabitat_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_FishingHabitat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_FishingHabitat_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_FishingHabitat CHECK CONSTRAINT FK_WCSPROGRAMS_FishingHabitat_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_targeted'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Targeted (
        WCSPROGRAMS_TargetedID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_TargetedName nvarchar(100)    , WCSPROGRAMS_TargetedExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_TargetedCode nvarchar(255)    , WCSPROGRAMS_TargetedDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Targeted WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Targeted_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Targeted CHECK CONSTRAINT FK_WCSPROGRAMS_Targeted_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Targeted WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Targeted_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Targeted CHECK CONSTRAINT FK_WCSPROGRAMS_Targeted_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_releasesharkray'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_ReleaseSharkRay (
        WCSPROGRAMS_ReleaseSharkRayID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_ReleaseSharkRayName nvarchar(100)    , WCSPROGRAMS_ReleaseSharkRayExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_ReleaseSharkRayCode nvarchar(255)    , WCSPROGRAMS_ReleaseSharkRayDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_ReleaseSharkRay WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_ReleaseSharkRay_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_ReleaseSharkRay CHECK CONSTRAINT FK_WCSPROGRAMS_ReleaseSharkRay_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_ReleaseSharkRay WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_ReleaseSharkRay_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_ReleaseSharkRay CHECK CONSTRAINT FK_WCSPROGRAMS_ReleaseSharkRay_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_type'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Type (
        WCSPROGRAMS_TypeID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_TypeName nvarchar(100)    , WCSPROGRAMS_TypeExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_TypeCode nvarchar(255)    , WCSPROGRAMS_TypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
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
        WCSPROGRAMS_GenusID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_GenusName nvarchar(100)    , WCSPROGRAMS_GenusExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_GenusCode nvarchar(255)    , WCSPROGRAMS_GenusDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
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
        WCSPROGRAMS_SexID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_SexName nvarchar(100)    , WCSPROGRAMS_SexExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_SexCode nvarchar(255)    , WCSPROGRAMS_SexDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Sex WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Sex_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Sex CHECK CONSTRAINT FK_WCSPROGRAMS_Sex_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Sex WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Sex_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Sex CHECK CONSTRAINT FK_WCSPROGRAMS_Sex_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_geartype'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_GearType (
        WCSPROGRAMS_GearTypeID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_GearTypeName nvarchar(100)    , WCSPROGRAMS_GearTypeExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_GearTypeCode nvarchar(255)    , WCSPROGRAMS_GearTypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_GearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_GearType_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_GearType CHECK CONSTRAINT FK_WCSPROGRAMS_GearType_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_GearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_GearType_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_GearType CHECK CONSTRAINT FK_WCSPROGRAMS_GearType_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_dnasamplecollected'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_DnaSampleCollected (
        WCSPROGRAMS_DnaSampleCollectedID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_DnaSampleCollectedName nvarchar(100)    , WCSPROGRAMS_DnaSampleCollectedExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_DnaSampleCollectedCode nvarchar(255)    , WCSPROGRAMS_DnaSampleCollectedDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_DnaSampleCollected WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_DnaSampleCollected_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_DnaSampleCollected CHECK CONSTRAINT FK_WCSPROGRAMS_DnaSampleCollected_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_DnaSampleCollected WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_DnaSampleCollected_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_DnaSampleCollected CHECK CONSTRAINT FK_WCSPROGRAMS_DnaSampleCollected_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_fishspecie'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_FishSpecie (
        WCSPROGRAMS_FishSpecieID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_FishSpecieName nvarchar(100)    , WCSPROGRAMS_FishSpecieExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_FishSpecieCode nvarchar(255)    , WCSPROGRAMS_FishSpecieDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_FishSpecie WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_FishSpecie_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_FishSpecie CHECK CONSTRAINT FK_WCSPROGRAMS_FishSpecie_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_FishSpecie WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_FishSpecie_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_FishSpecie CHECK CONSTRAINT FK_WCSPROGRAMS_FishSpecie_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_vendorsex'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_VendorSex (
        WCSPROGRAMS_VendorSexID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_VendorSexName nvarchar(100)    , WCSPROGRAMS_VendorSexExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_VendorSexCode nvarchar(255)    , WCSPROGRAMS_VendorSexDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_VendorSex WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_VendorSex_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_VendorSex CHECK CONSTRAINT FK_WCSPROGRAMS_VendorSex_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_VendorSex WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_VendorSex_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_VendorSex CHECK CONSTRAINT FK_WCSPROGRAMS_VendorSex_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_wherebought'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_WhereBought (
        WCSPROGRAMS_WhereBoughtID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_WhereBoughtName nvarchar(100)    , WCSPROGRAMS_WhereBoughtExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_WhereBoughtCode nvarchar(255)    , WCSPROGRAMS_WhereBoughtDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_WhereBought WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_WhereBought_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_WhereBought CHECK CONSTRAINT FK_WCSPROGRAMS_WhereBought_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_WhereBought WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_WhereBought_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_WhereBought CHECK CONSTRAINT FK_WCSPROGRAMS_WhereBought_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_whosoldto'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_WhoSoldTo (
        WCSPROGRAMS_WhoSoldToID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_WhoSoldToName nvarchar(100)    , WCSPROGRAMS_WhoSoldToExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_WhoSoldToCode nvarchar(255)    , WCSPROGRAMS_WhoSoldToDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_WhoSoldTo WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_WhoSoldTo_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_WhoSoldTo CHECK CONSTRAINT FK_WCSPROGRAMS_WhoSoldTo_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_WhoSoldTo WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_WhoSoldTo_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_WhoSoldTo CHECK CONSTRAINT FK_WCSPROGRAMS_WhoSoldTo_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_stype'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SType (
        WCSPROGRAMS_STypeID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_STypeName nvarchar(100)    , WCSPROGRAMS_STypeExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_STypeCode nvarchar(255)    , WCSPROGRAMS_STypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SType_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SType CHECK CONSTRAINT FK_WCSPROGRAMS_SType_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SType_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SType CHECK CONSTRAINT FK_WCSPROGRAMS_SType_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sgenus'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SGenus (
        WCSPROGRAMS_SGenusID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_SGenusName nvarchar(100)    , WCSPROGRAMS_SGenusExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_SGenusCode nvarchar(255)    , WCSPROGRAMS_SGenusDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SGenus WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SGenus_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SGenus CHECK CONSTRAINT FK_WCSPROGRAMS_SGenus_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SGenus WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SGenus_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SGenus CHECK CONSTRAINT FK_WCSPROGRAMS_SGenus_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sspecies'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SSpecies (
        WCSPROGRAMS_SSpeciesID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_SSpeciesName nvarchar(100)    , WCSPROGRAMS_SSpeciesExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_SSpeciesCode nvarchar(255)    , WCSPROGRAMS_SSpeciesDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SSpecies WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SSpecies_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SSpecies CHECK CONSTRAINT FK_WCSPROGRAMS_SSpecies_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SSpecies WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SSpecies_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SSpecies CHECK CONSTRAINT FK_WCSPROGRAMS_SSpecies_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_ssex'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SSex (
        WCSPROGRAMS_SSexID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_SSexName nvarchar(100)    , WCSPROGRAMS_SSexExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_SSexCode nvarchar(255)    , WCSPROGRAMS_SSexDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SSex WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SSex_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SSex CHECK CONSTRAINT FK_WCSPROGRAMS_SSex_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SSex WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SSex_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SSex CHECK CONSTRAINT FK_WCSPROGRAMS_SSex_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sgeartype'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SGearType (
        WCSPROGRAMS_SGearTypeID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_SGearTypeName nvarchar(100)    , WCSPROGRAMS_SGearTypeExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_SGearTypeCode nvarchar(255)    , WCSPROGRAMS_SGearTypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SGearType_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SGearType CHECK CONSTRAINT FK_WCSPROGRAMS_SGearType_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SGearType_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SGearType CHECK CONSTRAINT FK_WCSPROGRAMS_SGearType_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sdnasamplecollected'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SDnaSampleCollected (
        WCSPROGRAMS_SDnaSampleCollectedID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_SDnaSampleCollectedName nvarchar(100)    , WCSPROGRAMS_SDnaSampleCollectedExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_SDnaSampleCollectedCode nvarchar(255)    , WCSPROGRAMS_SDnaSampleCollectedDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SDnaSampleCollected WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SDnaSampleCollected_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SDnaSampleCollected CHECK CONSTRAINT FK_WCSPROGRAMS_SDnaSampleCollected_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SDnaSampleCollected WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SDnaSampleCollected_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SDnaSampleCollected CHECK CONSTRAINT FK_WCSPROGRAMS_SDnaSampleCollected_SecuritySettingID_Row;
                  
                
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
        Verification nvarchar(max)    , SharkRayVendorsNb int    , Consent nvarchar(max)    , Pic3 nvarchar(max)    , Pic2 nvarchar(max)    , Pic1 nvarchar(max)    , Surveyor int    , Market int    , LandingSite int    , Survey int    , District int    , Country int    , Gps nvarchar(max)    , SurveyType int    , Deviceid nvarchar(max)    , FormDateEnd date    , Start date    , Today date    , Latitude float    , Longitude float    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , Payload nvarchar(max)    , WCSPROGRAMS_SharksRaysID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SharksRaysName nvarchar(255)    , WCSPROGRAMS_SharksRaysExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_SharksRaysCode nvarchar(255)    , WCSPROGRAMS_SharksRaysDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_Surveyor FOREIGN KEY (Surveyor)
                        REFERENCES WCSPROGRAMS_Surveyor (WCSPROGRAMS_SurveyorID);
                        ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_Surveyor;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_Market FOREIGN KEY (Market)
                        REFERENCES WCSPROGRAMS_Market (WCSPROGRAMS_MarketID);
                        ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_Market;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_LandingSite FOREIGN KEY (LandingSite)
                        REFERENCES WCSPROGRAMS_LandingSite (WCSPROGRAMS_LandingSiteID);
                        ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_LandingSite;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_Survey FOREIGN KEY (Survey)
                        REFERENCES WCSPROGRAMS_Survey (WCSPROGRAMS_SurveyID);
                        ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_Survey;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_District FOREIGN KEY (District)
                        REFERENCES WCSPROGRAMS_District (WCSPROGRAMS_DistrictID);
                        ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_District;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_Country FOREIGN KEY (Country)
                        REFERENCES WCSPROGRAMS_Country (WCSPROGRAMS_CountryID);
                        ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_Country;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_SurveyType FOREIGN KEY (SurveyType)
                        REFERENCES WCSPROGRAMS_SurveyType (WCSPROGRAMS_SurveyTypeID);
                        ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_SurveyType;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksrayssales'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRaysSales (
        SType int    , SGenus int    , SSpecies int    , SPic4 nvarchar(max)    , SPic5 nvarchar(max)    , SPic6 nvarchar(max)    , SPic7 nvarchar(max)    , SPic8 nvarchar(max)    , SPic9 nvarchar(max)    , SPic10 nvarchar(max)    , SPic11 nvarchar(max)    , SPic12 nvarchar(max)    , SLocalName nvarchar(max)    , SSex int    , SWeight float    , SDiscWidth float    , SDiscLength float    , STotalLength float    , SPrecaudalLength float    , SForkLength float    , SCarapaceLength int    , SCarapaceWidth int    , SGearType nvarchar(max)    , SGearTypeOther nvarchar(max)    , SDnaSampleCollected int    , SDnaCode nvarchar(max)    , SPriceSoldFor int    , SPriceSoldUsd nvarchar(100)    , SComment nvarchar(max)    , VendorUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_SalesID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SalesName nvarchar(255)    , WCSPROGRAMS_SalesExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_SalesCode nvarchar(255)    , WCSPROGRAMS_SalesDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
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
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_SType FOREIGN KEY (SType)
                        REFERENCES WCSPROGRAMS_SType (WCSPROGRAMS_STypeID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_SType;
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_SGenus FOREIGN KEY (SGenus)
                        REFERENCES WCSPROGRAMS_SGenus (WCSPROGRAMS_SGenusID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_SGenus;
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_SSpecies FOREIGN KEY (SSpecies)
                        REFERENCES WCSPROGRAMS_SSpecies (WCSPROGRAMS_SSpeciesID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_SSpecies;
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_SSex FOREIGN KEY (SSex)
                        REFERENCES WCSPROGRAMS_SSex (WCSPROGRAMS_SSexID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_SSex;
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_SDnaSampleCollected FOREIGN KEY (SDnaSampleCollected)
                        REFERENCES WCSPROGRAMS_SDnaSampleCollected (WCSPROGRAMS_SDnaSampleCollectedID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_SDnaSampleCollected;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksraysvendor'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRaysVendor (
        VendorSex int    , WhenLastSellSharkRay nvarchar(max)    , WhereBought int    , WhoSoldTo int    , WhoSoldOther nvarchar(max)    , SharksraysUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_VendorID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_VendorName nvarchar(255)    , WCSPROGRAMS_VendorExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_VendorCode nvarchar(255)    , WCSPROGRAMS_VendorDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
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
ALTER TABLE WCSPROGRAMS_SharksRaysVendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_VendorSex FOREIGN KEY (VendorSex)
                        REFERENCES WCSPROGRAMS_VendorSex (WCSPROGRAMS_VendorSexID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_VendorSex;
ALTER TABLE WCSPROGRAMS_SharksRaysVendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WhereBought FOREIGN KEY (WhereBought)
                        REFERENCES WCSPROGRAMS_WhereBought (WCSPROGRAMS_WhereBoughtID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WhereBought;
ALTER TABLE WCSPROGRAMS_SharksRaysVendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WhoSoldTo FOREIGN KEY (WhoSoldTo)
                        REFERENCES WCSPROGRAMS_WhoSoldTo (WCSPROGRAMS_WhoSoldToID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WhoSoldTo;
                
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
        FishSpecie int    , NbObserved int    , TotalWeightFish int    , FishPartConsumed int    , FishPriceKg int    , FishPriceSoldUsd nvarchar(100)    , BoatUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_FishCatchID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_FishCatchName nvarchar(255)    , WCSPROGRAMS_FishCatchExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_FishCatchCode nvarchar(255)    , WCSPROGRAMS_FishCatchDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
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
ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_FishSpecie FOREIGN KEY (FishSpecie)
                        REFERENCES WCSPROGRAMS_FishSpecie (WCSPROGRAMS_FishSpecieID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_FishSpecie;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksrayscatchdetails'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRaysCatchDetails (
        Type int    , Genus int    , Species int    , LocalName nvarchar(max)    , Sex int    , Weight float    , DiscWidth float    , DiscLength float    , TotalLength float    , ForkLength float    , PrecaudalLength float    , Pic4 nvarchar(max)    , Pic5 nvarchar(max)    , Pic6 nvarchar(max)    , Pic7 nvarchar(max)    , Pic8 nvarchar(max)    , Pic9 nvarchar(max)    , Pic10 nvarchar(max)    , Pic11 nvarchar(max)    , Pic12 nvarchar(max)    , GearType nvarchar(max)    , GearTypeOther nvarchar(max)    , DnaSampleCollected int    , DnaCode nvarchar(max)    , PriceSoldFor int    , PriceSoldUsd nvarchar(100)    , Comment nvarchar(max)    , BoatUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_CatchDetailsID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_CatchDetailsName nvarchar(255)    , WCSPROGRAMS_CatchDetailsExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_CatchDetailsCode nvarchar(255)    , WCSPROGRAMS_CatchDetailsDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
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
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_Type FOREIGN KEY (Type)
                        REFERENCES WCSPROGRAMS_Type (WCSPROGRAMS_TypeID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_Type;
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_Genus FOREIGN KEY (Genus)
                        REFERENCES WCSPROGRAMS_Genus (WCSPROGRAMS_GenusID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_Genus;
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_Species FOREIGN KEY (Species)
                        REFERENCES WCSPROGRAMS_Species (WCSPROGRAMS_SpeciesID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_Species;
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_Sex FOREIGN KEY (Sex)
                        REFERENCES WCSPROGRAMS_Sex (WCSPROGRAMS_SexID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_Sex;
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_DnaSampleCollected FOREIGN KEY (DnaSampleCollected)
                        REFERENCES WCSPROGRAMS_DnaSampleCollected (WCSPROGRAMS_DnaSampleCollectedID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_DnaSampleCollected;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksraysboat'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRaysBoat (
        BoatInfo int    , BoatType int    , OtherBoat nvarchar(max)    , Crew int    , WomenCrew int    , Engine int    , PrimaryGear int    , PrimaryNetType nvarchar(max)    , PrimaryLineType nvarchar(max)    , PrimaryOtherType nvarchar(max)    , PrimaryGearLocalName nvarchar(max)    , PrimaryNetLength int    , PrimaryNetHeight int    , PrimaryMeshSize int    , PrimaryMeshSizeUnit int    , PrimaryLinesNb int    , PrimaryHooksNb int    , PrimaryHookSize nvarchar(max)    , SecondaryGear int    , SecondaryNetType nvarchar(max)    , SecondaryLineType nvarchar(max)    , SecondaryOtherType nvarchar(max)    , SecondaryGearLocalName nvarchar(max)    , SecondaryNetLength int    , SecondaryNetHeight int    , SecondaryMeshSize int    , SecondaryMeshSizeUnit int    , SecondaryLinesNb int    , SecondaryHooksNb int    , SecondaryHookSize nvarchar(max)    , FishingLocation nvarchar(max)    , FishingDepth int    , FishingHabitat int    , OtherHabitat nvarchar(max)    , DistanceSite nvarchar(max)    , FishingStart nvarchar(max)    , FishingEnd nvarchar(max)    , FishingTime int    , TravelTime int    , NbBoats int    , Targeted int    , LastCatchSharkRay nvarchar(max)    , ReleaseSharkRay int    , PercentEat int    , PercentSell int    , PercentGive int    , WhereSellFins nvarchar(max)    , WhereSellMeat nvarchar(max)    , WhereSellOil nvarchar(max)    , FinsPrice int    , FinsPriceUsd nvarchar(100)    , MeatPrice int    , MeatPriceUsd nvarchar(100)    , OilPrice int    , OilPriceUsd nvarchar(100)    , NbSharksUnsampled int    , NbRaysUnsampled int    , NbSharkLikeRaysUnsampled int    , SharksraysUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_BoatID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_BoatName nvarchar(255)    , WCSPROGRAMS_BoatExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_BoatCode nvarchar(255)    , WCSPROGRAMS_BoatDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
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
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_BoatInfo FOREIGN KEY (BoatInfo)
                        REFERENCES WCSPROGRAMS_BoatInfo (WCSPROGRAMS_BoatInfoID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_BoatInfo;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_BoatType FOREIGN KEY (BoatType)
                        REFERENCES WCSPROGRAMS_BoatType (WCSPROGRAMS_BoatTypeID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_BoatType;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_PrimaryGear FOREIGN KEY (PrimaryGear)
                        REFERENCES WCSPROGRAMS_PrimaryGear (WCSPROGRAMS_PrimaryGearID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_PrimaryGear;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_PrimaryMeshSizeUnit FOREIGN KEY (PrimaryMeshSizeUnit)
                        REFERENCES WCSPROGRAMS_PrimaryMeshSizeUnit (WCSPROGRAMS_PrimaryMeshSizeUnitID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_PrimaryMeshSizeUnit;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_SecondaryGear FOREIGN KEY (SecondaryGear)
                        REFERENCES WCSPROGRAMS_SecondaryGear (WCSPROGRAMS_SecondaryGearID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_SecondaryGear;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_SecondaryMeshSizeUnit FOREIGN KEY (SecondaryMeshSizeUnit)
                        REFERENCES WCSPROGRAMS_SecondaryMeshSizeUnit (WCSPROGRAMS_SecondaryMeshSizeUnitID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_SecondaryMeshSizeUnit;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_FishingHabitat FOREIGN KEY (FishingHabitat)
                        REFERENCES WCSPROGRAMS_FishingHabitat (WCSPROGRAMS_FishingHabitatID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_FishingHabitat;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_Targeted FOREIGN KEY (Targeted)
                        REFERENCES WCSPROGRAMS_Targeted (WCSPROGRAMS_TargetedID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_Targeted;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_ReleaseSharkRay FOREIGN KEY (ReleaseSharkRay)
                        REFERENCES WCSPROGRAMS_ReleaseSharkRay (WCSPROGRAMS_ReleaseSharkRayID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_ReleaseSharkRay;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_salessgeartype'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SalesSGearType (
        WCSPROGRAMS_SGearTypeID int    , WCSPROGRAMS_SalesID int    , WCSPROGRAMS_SGearTypeName nvarchar(255)    , WCSPROGRAMS_SGearTypeExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_SGearTypeCode nvarchar(255)    , WCSPROGRAMS_SGearTypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SalesSGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SalesSGearType_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SalesSGearType CHECK CONSTRAINT FK_WCSPROGRAMS_SalesSGearType_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SalesSGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SalesSGearType_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SalesSGearType CHECK CONSTRAINT FK_WCSPROGRAMS_SalesSGearType_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SalesSGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SalesSGearType_WCSPROGRAMS_SGearTypeID FOREIGN KEY (WCSPROGRAMS_SGearTypeID)
                        REFERENCES WCSPROGRAMS_SGearType (WCSPROGRAMS_SGearTypeID);
                        ALTER TABLE WCSPROGRAMS_SalesSGearType CHECK CONSTRAINT FK_WCSPROGRAMS_SalesSGearType_WCSPROGRAMS_SGearTypeID;
ALTER TABLE WCSPROGRAMS_SalesSGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SalesSGearType_WCSPROGRAMS_SalesID FOREIGN KEY (WCSPROGRAMS_SalesID)
                        REFERENCES WCSPROGRAMS_SharksRaysSales (WCSPROGRAMS_SalesID);
                        ALTER TABLE WCSPROGRAMS_SalesSGearType CHECK CONSTRAINT FK_WCSPROGRAMS_SalesSGearType_WCSPROGRAMS_SalesID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_catchdetailsgeartype'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_CatchDetailsGearType (
        WCSPROGRAMS_GearTypeID int    , WCSPROGRAMS_CatchDetailsID int    , WCSPROGRAMS_GearTypeName nvarchar(255)    , WCSPROGRAMS_GearTypeExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_GearTypeCode nvarchar(255)    , WCSPROGRAMS_GearTypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_CatchDetailsGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGearType_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_CatchDetailsGearType CHECK CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGearType_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_CatchDetailsGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGearType_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_CatchDetailsGearType CHECK CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGearType_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_CatchDetailsGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGearType_WCSPROGRAMS_GearTypeID FOREIGN KEY (WCSPROGRAMS_GearTypeID)
                        REFERENCES WCSPROGRAMS_GearType (WCSPROGRAMS_GearTypeID);
                        ALTER TABLE WCSPROGRAMS_CatchDetailsGearType CHECK CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGearType_WCSPROGRAMS_GearTypeID;
ALTER TABLE WCSPROGRAMS_CatchDetailsGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGearType_WCSPROGRAMS_CatchDetailsID FOREIGN KEY (WCSPROGRAMS_CatchDetailsID)
                        REFERENCES WCSPROGRAMS_SharksRaysCatchDetails (WCSPROGRAMS_CatchDetailsID);
                        ALTER TABLE WCSPROGRAMS_CatchDetailsGearType CHECK CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGearType_WCSPROGRAMS_CatchDetailsID;
                
