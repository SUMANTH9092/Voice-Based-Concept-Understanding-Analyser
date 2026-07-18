import streamlit as st
import base64
import os

def apply_custom_style(bg_image_path=None):
    """
    Injects custom CSS to style Streamlit to match the dark glassmorphic React theme,
    supporting a base64 background image overlay.
    """
    # Load background image as base64
    base64_bg = ""
    if bg_image_path and os.path.exists(bg_image_path):
        try:
            with open(bg_image_path, "rb") as f:
                base64_bg = base64.b64encode(f.read()).decode()
        except Exception:
            pass

    # Build background style rule
    if base64_bg:
        bg_style_rule = f"""
            background-color: #020016 !important;
            background-image: 
                radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.15) 0%, rgba(2, 0, 22, 0.95) 80%),
                url('data:image/jpeg;base64,{base64_bg}') !important;
            background-size: cover !important;
            background-position: center !important;
            background-attachment: fixed !important;
        """
    else:
        bg_style_rule = """
            background-color: #03001e !important;
            background-image: radial-gradient(circle at 50% 0%, rgba(138, 43, 226, 0.18) 0%, rgba(3, 0, 30, 0) 75%) !important;
        """

    st.markdown(f"""
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;700;800&display=swap');
        
        /* General Page & Body Background styling */
        html, body, [data-testid="stAppViewContainer"] {{
            {bg_style_rule}
            color: #f3f4f6 !important;
            font-family: 'Inter', sans-serif !important;
        }}

        /* Set overall container maximum width and padding */
        [data-testid="stAppViewBlockContainer"] {{
            max-width: 1300px !important;
            padding: 3rem 1.5rem !important;
        }}

        /* Typography & Custom fonts */
        h1, h2, h3, h4, h5, h6, .stHeader, .stMarkdown p, .stMarkdown li {{
            font-family: 'Inter', sans-serif !important;
            color: #f3f4f6 !important;
        }}
        
        /* Heading aesthetics */
        h1, h2, h3 {{
            font-family: 'Outfit', sans-serif !important;
            font-weight: 700 !important;
        }}

        h2 {{
            font-size: 1.5rem !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
            padding-bottom: 8px !important;
            margin-top: 1.5rem !important;
            margin-bottom: 1rem !important;
        }}

        h3 {{
            font-size: 1.2rem !important;
            margin-bottom: 0.75rem !important;
            color: #00f2fe !important;
        }}

        /* Buttons Styling (Vite/React premium CTA style) */
        div.stButton > button, div.stDownloadButton > button {{
            background: linear-gradient(135deg, #8a2be2 0%, #4facfe 100%) !important;
            color: white !important;
            border: none !important;
            padding: 12px 24px !important;
            border-radius: 12px !important;
            font-family: 'Outfit', sans-serif !important;
            font-weight: 600 !important;
            font-size: 1rem !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            cursor: pointer !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3) !important;
            width: 100% !important;
            margin-top: 5px !important;
        }}

        div.stButton > button:hover, div.stDownloadButton > button:hover {{
            transform: translateY(-2px) !important;
            box-shadow: 0 8px 25px rgba(0, 242, 254, 0.4) !important;
            background: linear-gradient(135deg, #00f2fe 0%, #9b51e0 100%) !important;
        }}

        div.stButton > button:active, div.stDownloadButton > button:active {{
            transform: translateY(0) !important;
        }}

        /* Secondary Button (for generating reference definition) */
        .secondary-btn button {{
            background: rgba(255, 255, 255, 0.05) !important;
            color: #f3f4f6 !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            box-shadow: none !important;
        }}
        .secondary-btn button:hover {{
            background: rgba(255, 255, 255, 0.1) !important;
            border-color: #00f2fe !important;
            box-shadow: 0 4px 15px rgba(0, 242, 254, 0.15) !important;
        }}

        /* Inputs styled as individual glass cards directly in CSS (prevents unclosed div box issues) */
        div[data-testid="stTextInput"], div[data-testid="stFileUploader"], .glass-card {{
            background: rgba(10, 12, 30, 0.45) !important;
            backdrop-filter: blur(16px) !important;
            -webkit-backdrop-filter: blur(16px) !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            border-radius: 16px !important;
            padding: 24px !important;
            margin-bottom: 24px !important;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4) !important;
        }}

        /* Clean up inputs internals when nested */
        div[data-testid="stTextInput"] input {{
            background-color: rgba(0, 0, 0, 0.3) !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            color: #f3f4f6 !important;
            border-radius: 12px !important;
            padding: 12px 16px !important;
            font-size: 0.95rem !important;
            transition: all 0.2s ease !important;
        }}
        div[data-testid="stTextInput"] input:focus {{
            border-color: #9b51e0 !important;
            box-shadow: 0 0 8px rgba(155, 81, 224, 0.3) !important;
        }}
        div[data-testid="stTextInput"] label {{
            color: #9ca3af !important;
            font-size: 0.95rem !important;
            font-weight: 500 !important;
            margin-bottom: 8px !important;
        }}

        /* File Uploader internals adjustments */
        div[data-testid="stFileUploader"] label {{
            color: #9ca3af !important;
            font-weight: 500 !important;
            font-size: 0.95rem !important;
            margin-bottom: 8px !important;
        }}
        div[data-testid="stFileUploader"] button {{
            background-color: rgba(255, 255, 255, 0.05) !important;
            color: #f3f4f6 !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 8px !important;
            transition: all 0.2s ease !important;
            font-size: 0.85rem !important;
        }}
        div[data-testid="stFileUploader"] button:hover {{
            background-color: rgba(255, 255, 255, 0.08) !important;
            border-color: #00f2fe !important;
        }}

        /* Metric Container Styling (Glassmorphic cards) */
        div[data-testid="metric-container"] {{
            background: rgba(255, 255, 255, 0.02) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            border: 1px solid rgba(255, 255, 255, 0.05) !important;
            border-radius: 14px !important;
            padding: 12px 16px !important;
            box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.2) !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }}
        div[data-testid="metric-container"]:hover {{
            background: rgba(255, 255, 255, 0.04) !important;
            border-color: rgba(255, 255, 255, 0.08) !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 20px 0 rgba(0, 242, 254, 0.1) !important;
        }}
        div[data-testid="stMetricLabel"] {{
            color: #9ca3af !important;
            font-size: 0.85rem !important;
            font-weight: 500 !important;
        }}
        div[data-testid="stMetricValue"] {{
            background: linear-gradient(135deg, #00f2fe 0%, #9b51e0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 800 !important;
            font-size: 1.8rem !important;
            font-family: 'Outfit', sans-serif !important;
        }}

        /* Streamlit Alerts / Success / Error / Warning styling */
        div[data-testid="stAlert"] {{
            background: rgba(10, 12, 30, 0.45) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            border-radius: 12px !important;
            border: 1px solid rgba(255, 255, 255, 0.06) !important;
            color: #f3f4f6 !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25) !important;
            padding: 12px 16px !important;
        }}
        div[data-testid="stAlert"] p {{
            color: #f3f4f6 !important;
            font-weight: 500 !important;
        }}
        
        div[role="alert"]:has(svg[data-testid="stNotificationIconSuccess"]) {{
            border-left: 4px solid #10b981 !important;
        }}
        div[role="alert"]:has(svg[data-testid="stNotificationIconError"]) {{
            border-left: 4px solid #ef4444 !important;
        }}
        div[role="alert"]:has(svg[data-testid="stNotificationIconWarning"]) {{
            border-left: 4px solid #f59e0b !important;
        }}

        /* Audio player wrapper */
        div[data-testid="stAudio"] {{
            background-color: rgba(255, 255, 255, 0.02) !important;
            border: 1px solid rgba(255, 255, 255, 0.06) !important;
            border-radius: 10px !important;
            padding: 6px !important;
            margin-top: 5px !important;
            margin-bottom: 15px !important;
        }}

        /* Waveform image styling */
        div[data-testid="stImage"] img {{
            border-radius: 12px !important;
            border: 1px solid rgba(255, 255, 255, 0.06) !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25) !important;
            background-color: rgba(0, 0, 0, 0.25) !important;
            padding: 6px !important;
        }}

        /* JSON blocks formatting */
        div.stJson {{
            background-color: rgba(10, 12, 30, 0.5) !important;
            border: 1px solid rgba(255, 255, 255, 0.05) !important;
            border-radius: 10px !important;
            color: #f3f4f6 !important;
            padding: 12px !important;
        }}

        /* Streamlit Dividers */
        hr {{
            border-color: rgba(255, 255, 255, 0.08) !important;
            margin: 1.5rem 0 !important;
        }}

        /* Custom Tabs styling */
        div[data-baseweb="tab-list"] {{
            background-color: rgba(10, 12, 30, 0.45) !important;
            border-radius: 12px !important;
            padding: 6px !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            gap: 8px !important;
            margin-bottom: 24px !important;
        }}

        button[data-baseweb="tab"] {{
            background-color: transparent !important;
            color: #9ca3af !important;
            border: none !important;
            border-radius: 8px !important;
            padding: 10px 20px !important;
            font-weight: 600 !important;
            font-family: 'Outfit', sans-serif !important;
            transition: all 0.2s ease !important;
        }}

        button[data-baseweb="tab"]:hover {{
            color: #f3f4f6 !important;
            background-color: rgba(255, 255, 255, 0.03) !important;
        }}

        button[data-baseweb="tab"][aria-selected="true"] {{
            background: linear-gradient(135deg, rgba(138, 43, 226, 0.2) 0%, rgba(0, 242, 254, 0.2) 100%) !important;
            color: #00f2fe !important;
            border: 1px solid rgba(0, 242, 254, 0.3) !important;
            box-shadow: 0 0 10px rgba(0, 242, 254, 0.15) !important;
        }}

        /* Hide Streamlit default UI branding and footer */
        #MainMenu {{ visibility: hidden; }}
        footer {{ visibility: hidden; }}
        header {{ visibility: hidden; }}
        [data-testid="stHeader"] {{ display: none !important; }}
        [data-testid="stDecoration"] {{ display: none !important; }}

        .stat-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }}

        .stat-card {{
            background: rgba(255, 255, 255, 0.02) !important;
            border: 1px solid rgba(255, 255, 255, 0.05) !important;
            border-radius: 12px !important;
            padding: 12px !important;
            text-align: center;
            transition: all 0.2s ease !important;
        }}
        .stat-card:hover {{
            background: rgba(255, 255, 255, 0.04) !important;
            border-color: rgba(255, 255, 255, 0.08) !important;
        }}

        .stat-label {{
            color: #9ca3af !important;
            font-size: 0.8rem !important;
            margin-bottom: 4px !important;
            font-weight: 500 !important;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }}

        .stat-value {{
            color: #00f2fe !important;
            font-size: 1.2rem !important;
            font-weight: 700 !important;
            font-family: 'Outfit', sans-serif !important;
        }}

        .fact-box {{
            border-radius: 12px;
            padding: 14px 18px;
            margin-bottom: 12px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 0.95rem;
            line-height: 1.5;
        }}
        .fact-correct {{
            background: rgba(16, 185, 129, 0.06) !important;
            border-left: 4px solid #10b981 !important;
        }}
        .fact-incorrect {{
            background: rgba(239, 68, 68, 0.06) !important;
            border-left: 4px solid #ef4444 !important;
        }}
        .fact-missing {{
            background: rgba(245, 158, 11, 0.06) !important;
            border-left: 4px solid #f59e0b !important;
        }}

        .placeholder-panel {{
            text-align: center;
            padding: 80px 40px;
            background: rgba(10, 12, 30, 0.25);
            border: 1px dashed rgba(255, 255, 255, 0.1) !important;
            border-radius: 16px;
            min-height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.4);
        }}

        .placeholder-icon {{
            font-size: 4.5rem;
            margin-bottom: 24px;
            animation: float 6s ease-in-out infinite;
            filter: drop-shadow(0 0 15px rgba(138, 43, 226, 0.4));
        }}

        .placeholder-title {{
            font-family: 'Outfit', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: #f3f4f6;
            margin-bottom: 10px;
        }}

        .placeholder-desc {{
            color: #9ca3af;
            font-size: 0.95rem;
            max-width: 420px;
            line-height: 1.6;
        }}

        @keyframes float {{
            0%, 100% {{ transform: translateY(0px); }}
            50% {{ transform: translateY(-10px); }}
        }}

        .main-gradient-text {{
            background: linear-gradient(135deg, #00f2fe 0%, #9b51e0 50%, #f857a6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 800;
        }}
        </style>
    """, unsafe_allow_html=True)
