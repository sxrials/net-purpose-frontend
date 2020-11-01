import random
from dataclasses import dataclass

from sqlalchemy.orm import Session

from app import crud, schemas
from app.core.config import settings
from app.db import base  # noqa: F401
from app.models.holding import Holding

# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly
# for more details: https://github.com/tiangolo/full-stack-fastapi-postgresql/issues/28

@dataclass
class Company:
    ticker: str
    name: str


companies = [
    Company('AAPL','APPLE INC'),
    Company('MSFT','MICROSOFT CORP'),
    Company('AMZN','AMAZON COM INC'),
    Company('FB','FACEBOOK CLASS A INC'),
    Company('GOOGL','ALPHABET INC CLASS A'),
    Company('GOOG','ALPHABET INC CLASS C'),
    Company('BRKB','BERKSHIRE HATHAWAY INC CLASS B'),
    Company('JNJ','JOHNSON & JOHNSON'),
    Company('V','VISA INC CLASS A'),
    Company('PG','PROCTER & GAMBLE'),
    Company('NVDA','NVIDIA CORP'),
    Company('HD','HOME DEPOT INC'),
    Company('JPM','JPMORGAN CHASE & CO'),
    Company('MA','MASTERCARD INC CLASS A'),
    Company('UNH','UNITEDHEALTH GROUP INC'),
    Company('VZ','VERIZON COMMUNICATIONS INC'),
    Company('DIS','WALT DISNEY'),
    Company('ADBE','ADOBE INC'),
    Company('CRM','SALESFORCE.COM INC'),
    Company('MRK','MERCK & CO INC'),
    Company('INTC','INTEL CORPORATION CORP'),
    Company('CMCSA','COMCAST CORP CLASS A'),
    Company('T','AT&T INC'),
    Company('NFLX','NETFLIX INC'),
    Company('PYPL','PAYPAL HOLDINGS INC'),
    Company('PFE','PFIZER INC'),
    Company('BAC','BANK OF AMERICA CORP'),
    Company('KO','COCA-COLA'),
    Company('WMT','WALMART INC'),
    Company('ABT','ABBOTT LABORATORIES'),
    Company('PEP','PEPSICO INC'),
    Company('CSCO','CISCO SYSTEMS INC'),
    Company('TMO','THERMO FISHER SCIENTIFIC INC'),
    Company('MCD','MCDONALDS CORP'),
    Company('XOM','EXXON MOBIL CORP'),
    Company('ABBV','ABBVIE INC'),
    Company('ACN','ACCENTURE PLC CLASS A'),
    Company('COST','COSTCO WHOLESALE CORP'),
    Company('CVX','CHEVRON CORP'),
    Company('AVGO','BROADCOM INC'),
    Company('AMGN','AMGEN INC'),
    Company('MDT','MEDTRONIC PLC'),
    Company('NKE','NIKE INC CLASS B'),
    Company('UNP','UNION PACIFIC CORP'),
    Company('NEE','NEXTERA ENERGY INC'),
    Company('BMY','BRISTOL MYERS SQUIBB'),
    Company('LIN','LINDE PLC'),
    Company('DHR','DANAHER CORP'),
    Company('QCOM','QUALCOMM INC'),
    Company('TXN','TEXAS INSTRUMENT INC'),
    Company('LLY','ELI LILLY'),
    Company('ORCL','ORACLE CORP'),
    Company('PM','PHILIP MORRIS INTERNATIONAL INC'),
    Company('LOW','LOWES COMPANIES INC'),
    Company('HON','HONEYWELL INTERNATIONAL INC'),
    Company('UPS','UNITED PARCEL SERVICE INC CLASS B'),
    Company('AMT','AMERICAN TOWER REIT CORP'),
    Company('IBM','INTERNATIONAL BUSINESS MACHINES CO'),
    Company('XTSLA','BLK CSH FND TREASURY SL AGENCY'),
    Company('SBUX','STARBUCKS CORP'),
    Company('MMM','3M'),
    Company('LMT','LOCKHEED MARTIN CORP'),
    Company('C','CITIGROUP INC'),
    Company('WFC','WELLS FARGO'),
    Company('CHTR','CHARTER COMMUNICATIONS INC CLASS A'),
    Company('RTX','RAYTHEON TECHNOLOGIES CORP'),
    Company('FIS','FIDELITY NATIONAL INFORMATION SERV'),
    Company('BA','BOEING'),
    Company('AMD','ADVANCED MICRO DEVICES INC'),
    Company('NOW','SERVICENOW INC'),
    Company('SPGI','S&P GLOBAL INC'),
    Company('BLK','BLACKROCK INC'),
    Company('CAT','CATERPILLAR INC'),
    Company('MDLZ','MONDELEZ INTERNATIONAL INC CLASS A'),
    Company('GILD','GILEAD SCIENCES INC'),
    Company('INTU','INTUIT INC'),
    Company('ISRG','INTUITIVE SURGICAL INC'),
    Company('CVS','CVS HEALTH CORP'),
    Company('ZTS','ZOETIS INC CLASS A'),
    Company('MO','ALTRIA GROUP INC'),
    Company('PLD','PROLOGIS REIT INC'),
    Company('TGT','TARGET CORP'),
    Company('BKNG','BOOKING HOLDINGS INC'),
    Company('VRTX','VERTEX PHARMACEUTICALS INC'),
    Company('AXP','AMERICAN EXPRESS'),
    Company('DE','DEERE'),
    Company('SYK','STRYKER CORP'),
    Company('CCI','CROWN CASTLE INTERNATIONAL REIT CO'),
    Company('BDX','BECTON DICKINSON'),
    Company('TJX','TJX INC'),
    Company('D','DOMINION ENERGY INC'),
    Company('EQIX','EQUINIX REIT INC'),
    Company('APD','AIR PRODUCTS AND CHEMICALS INC'),
    Company('ANTM','ANTHEM INC'),
    Company('CL','COLGATE-PALMOLIVE'),
    Company('TMUS','T MOBILE US INC'),
    Company('CI','CIGNA CORP'),
    Company('DUK','DUKE ENERGY CORP'),
    Company('GE','GENERAL ELECTRIC'),
]

_100K = 100000

def init_db(db: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next line
    # Base.metadata.create_all(bind=engine)

    user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER)
    if not user:
        user_in = schemas.UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        user = crud.user.create(db, obj_in=user_in)  # noqa: F841

    db.query(Holding).filter_by(owner_id=1).delete()
    for company in companies:
        value = round(random.random() * _100K, 2)
        holding = Holding(name=company.name, ticker=company.ticker, value=value, owner_id=1)
        db.add(holding)

    db.commit()
