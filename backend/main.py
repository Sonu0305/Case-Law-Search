from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import uvicorn

app = FastAPI(title="Case Law Search API", version="1.0.0")

# CORS Configuration - Allow frontend to communicate with backend
origins = [
    "http://localhost:3000",  # React default port
    "http://localhost:5173",  # Vite default port
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock case law database
MOCK_CASES = [
    {
        "id": 1,
        "case_name": "State of Maharashtra v. Rajendra Singh",
        "citation": "2024 SCC 145",
        "keywords": ["bail", "custody", "criminal"],
        "summary": "Landmark judgment on bail conditions in custody cases."
    },
    {
        "id": 2,
        "case_name": "Kumar v. State of Delhi",
        "citation": "2023 AIR 892",
        "keywords": ["fir", "investigation", "criminal"],
        "summary": "Ruling on FIR filing procedures and investigation timelines."
    },
    {
        "id": 3,
        "case_name": "Sharma v. Commissioner of Police",
        "citation": "2024 SCC 67",
        "keywords": ["bail", "anticipatory", "protection"],
        "summary": "Guidelines for anticipatory bail in economic offenses."
    },
    {
        "id": 4,
        "case_name": "State v. Patel & Others",
        "citation": "2023 AIR 1234",
        "keywords": ["custody", "detention", "rights"],
        "summary": "Interpretation of custody rights and detention procedures."
    },
    {
        "id": 5,
        "case_name": "Verma v. State of UP",
        "citation": "2024 SCC 23",
        "keywords": ["fir", "quashing", "harassment"],
        "summary": "Conditions for quashing FIR in harassment cases."
    },
    {
        "id": 6,
        "case_name": "State of Karnataka v. Reddy",
        "citation": "2023 AIR 567",
        "keywords": ["bail", "economic offense", "crime"],
        "summary": "Bail considerations in white-collar crimes."
    },
    {
        "id": 7,
        "case_name": "Das v. Union of India",
        "citation": "2024 SCC 89",
        "keywords": ["custody", "fundamental rights", "article 21"],
        "summary": "Protection of fundamental rights during custody."
    },
    {
        "id": 8,
        "case_name": "Gupta v. State of Rajasthan",
        "citation": "2023 AIR 2341",
        "keywords": ["fir", "cognizable offense", "procedure"],
        "summary": "Procedure for filing FIR in cognizable offenses."
    },
]


@app.get("/")
def read_root():
    """Root endpoint - API health check"""
    return {
        "message": "Case Law Search API",
        "version": "1.0.0",
        "status": "active"
    }


@app.get("/api/search")
def search_cases(keyword: str = Query(..., min_length=1, description="Search keyword")):
    """
    Search for case laws by keyword
    
    Args:
        keyword: Search term to match against case names, citations, and keywords
        
    Returns:
        List of matching cases with case_name and citation
    """
    try:
        # Validate input
        if not keyword or keyword.strip() == "":
            raise HTTPException(status_code=400, detail="Keyword cannot be empty")
        
        # Convert to lowercase for case-insensitive search
        search_term = keyword.lower().strip()
        
        # Filter cases based on keyword match
        results = []
        for case in MOCK_CASES:
            # Check if keyword matches case name, citation, keywords, or summary
            if (search_term in case["case_name"].lower() or
                search_term in case["citation"].lower() or
                any(search_term in kw.lower() for kw in case["keywords"]) or
                search_term in case["summary"].lower()):
                
                results.append({
                    "id": case["id"],
                    "case_name": case["case_name"],
                    "citation": case["citation"],
                    "summary": case["summary"]
                })
        
        return {
            "success": True,
            "keyword": keyword,
            "count": len(results),
            "results": results
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.get("/api/cases")
def get_all_cases():
    """Get all available cases"""
    return {
        "success": True,
        "count": len(MOCK_CASES),
        "results": [
            {
                "id": case["id"],
                "case_name": case["case_name"],
                "citation": case["citation"],
                "summary": case["summary"]
            }
            for case in MOCK_CASES
        ]
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
