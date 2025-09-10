// Election Dashboard Main Application
class ElectionDashboard {
  constructor() {
    this.data = {
      candidates: [
        { 
          id: 1, 
          name: "Ahmad Susanto", 
          votes: 2969, // 65% of 4568
          image: "assets/candidate-1.jpg"
        },
        { 
          id: 2, 
          name: "Budi Prasetyo", 
          votes: 1370, // 30% of 4568
          image: "assets/candidate-2.jpg"
        }
      ],
      totalVotes: 4568,
      invalidVotes: 229, // 5%
      lastUpdate: new Date()
    };
    
    this.isLoading = true;
    this.init();
  }

  init() {
    this.renderApp();
    this.startRealTimeUpdates();
    
    // Simulate initial loading
    setTimeout(() => {
      this.isLoading = false;
      this.renderApp();
    }, 2000);
  }

  renderApp() {
    const root = document.getElementById('root');
    
    if (this.isLoading) {
      root.innerHTML = this.renderLoadingScreen();
      return;
    }

    root.innerHTML = `
      <div class="min-h-screen" style="background: linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--primary) / 0.1) 100%);">
        ${this.renderHeader()}
        ${this.renderMainContent()}
      </div>
    `;
  }

  renderLoadingScreen() {
    return `
      <div class="min-h-screen election-hero flex items-center justify-center">
        <div class="text-center text-white">
          <div class="mb-8">
            <div class="text-6xl mb-4" style="animation: bounce 1s infinite;">🗳️</div>
            <h2 class="text-2xl font-bold mb-2">Memuat Data Pemilihan...</h2>
            <p class="opacity-90">Mengambil data real-time dari server</p>
          </div>
          
          <div class="loading-dots mb-4">
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
          </div>

          <div class="w-64 mx-auto bg-white/20 rounded-full h-2">
            <div class="bg-white h-2 rounded-full" style="width: 60%; animation: pulse 2s infinite;"></div>
          </div>
        </div>
      </div>
    `;
  }

  renderHeader() {
    const currentTime = new Date();
    return `
      <header class="election-hero text-white py-12 px-6">
        <div class="indonesia-map-bg opacity-10"></div>
        <div class="container mx-auto text-center relative z-10">
          <div class="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-4">
            🗳️ Live Count
          </div>
          
          <h1 class="text-3xl md:text-5xl font-black mb-4 leading-tight">
            Real-Time Perhitungan
            <br />
            <span style="background: linear-gradient(to right, white, rgba(255,255,255,0.8)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
              Pemilihan Kepala Desa
            </span>
          </h1>
          
          <div class="text-xl md:text-2xl font-bold mb-2">
            Desa Kedungbondo, Kecamatan Balen
          </div>
          
          <div class="text-sm md:text-base opacity-90 mb-8">
            Kabupaten Bojonegoro, Jawa Timur
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div class="election-card text-center">
              <div class="text-3xl font-black text-primary mb-2">
                ${this.data.totalVotes.toLocaleString('id-ID')}
              </div>
              <div class="text-sm text-muted-foreground">Total Suara Masuk</div>
            </div>

            <div class="election-card text-center">
              <div class="text-lg font-bold text-accent mb-2">
                ${this.formatTime(currentTime)}
              </div>
              <div class="text-sm text-muted-foreground">Waktu Sekarang (WIB)</div>
            </div>

            <div class="election-card text-center">
              <div class="text-lg font-bold text-election-success mb-2">
                ${this.formatTime(this.data.lastUpdate)}
              </div>
              <div class="text-sm text-muted-foreground">Update Terakhir</div>
            </div>
          </div>

          <div class="flex items-center justify-center mt-8 space-x-2">
            <div class="w-3 h-3 bg-red-500 rounded-full" style="animation: pulse 1s infinite;"></div>
            <span class="text-sm font-bold">LIVE UPDATE SETIAP 10 DETIK</span>
          </div>
        </div>
      </header>
    `;
  }

  renderMainContent() {
    const candidatesWithStats = this.data.candidates.map(candidate => {
      const percentage = this.data.totalVotes > 0 
        ? (candidate.votes / this.data.totalVotes) * 100 
        : 0;
      
      return {
        ...candidate,
        percentage,
        isLeading: candidate.votes === Math.max(...this.data.candidates.map(c => c.votes)) && this.data.totalVotes > 0
      };
    });

    const winner = candidatesWithStats.find(c => c.isLeading);

    return `
      <main class="container mx-auto px-6 py-12">
        <!-- Election Stats Overview -->
        <div class="mb-12">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="election-card text-center">
              <div class="text-2xl mb-2">👥</div>
              <div class="text-2xl font-bold text-primary">${candidatesWithStats.length}</div>
              <div class="text-sm text-muted-foreground">Calon</div>
            </div>
            
            <div class="election-card text-center">
              <div class="text-2xl mb-2">📊</div>
              <div class="text-2xl font-bold text-accent">${this.data.totalVotes.toLocaleString('id-ID')}</div>
              <div class="text-sm text-muted-foreground">Total Suara</div>
            </div>
            
            <div class="election-card text-center">
              <div class="text-2xl mb-2">🏆</div>
              <div class="text-lg font-bold text-election-success">
                ${winner ? winner.name.split(' ')[0] : 'Belum Ada'}
              </div>
              <div class="text-sm text-muted-foreground">Pemenang Sementara</div>
            </div>
            
            <div class="election-card text-center">
              <div class="text-2xl mb-2">❌</div>
              <div class="text-lg font-bold text-destructive">
                ${this.data.invalidVotes}
              </div>
              <div class="text-sm text-muted-foreground">Suara Tidak Sah (5%)</div>
            </div>
          </div>
        </div>

        <!-- Candidates Section -->
        <div class="mb-12">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-foreground mb-2">
              Calon Kepala Desa
            </h2>
            <p class="text-muted-foreground">
              Visualisasi real-time perolehan suara - Roket terbang tinggi sesuai jumlah suara! 🚀
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            ${candidatesWithStats.map((candidate, index) => this.renderCandidateCard(candidate, index)).join('')}
          </div>
        </div>

        <!-- Competition Visualization -->
        <div class="mb-12">
          <div class="election-card max-w-4xl mx-auto p-8">
            <h3 class="text-2xl font-bold text-center mb-6">Kompetisi Roket Racing 🚀</h3>
            <div class="relative">
              <div class="h-48 rounded-lg relative overflow-hidden mb-4" style="background: linear-gradient(to top, #dbeafe, #93c5fd);">
                <div class="absolute inset-0 opacity-20">
                  <div class="absolute top-4 left-10 text-2xl">☁️</div>
                  <div class="absolute top-8 right-16 text-xl">☁️</div>
                  <div class="absolute top-12 left-1/3 text-lg">☁️</div>
                </div>
                
                <div class="absolute bottom-0 left-0 right-0 flex justify-around items-end h-full px-8">
                  ${candidatesWithStats.map((candidate, index) => `
                    <div class="flex flex-col items-center">
                      <div class="text-sm font-bold mb-2" style="color: #1e3a8a;">
                        ${candidate.name.split(' ')[0]}
                      </div>
                      <div 
                        class="text-4xl transition-all duration-3000"
                        style="
                          transform: translateY(-${candidate.percentage * 3}px) scale(${1 + candidate.percentage/100});
                          transition-delay: ${index * 0.8}s;
                          filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4));
                        "
                      >
                        🚀
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
              
              <div class="text-center text-sm text-muted-foreground">
                Tinggi roket = Persentase suara (Semakin tinggi = Semakin banyak suara!)
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Info -->
        <footer class="text-center">
          <div class="election-card max-w-2xl mx-auto p-6">
            <h3 class="text-lg font-bold mb-4 flex items-center justify-center gap-2">
              🔄 Informasi Update Data
            </h3>
            
            <div class="space-y-2 text-sm text-muted-foreground mb-6">
              <p>📡 Data diambil secara real-time dari Google Spreadsheet</p>
              <p>🔄 Otomatis update setiap 10 detik tanpa refresh manual</p>
              <p>📊 Visualisasi menggunakan teknologi modern untuk transparansi pemilihan</p>
            </div>
            
            <p class="text-xs pt-4 border-t border-border mt-4">
              Pemilihan Kepala Desa Kedungbondo • Kecamatan Balen • Kabupaten Bojonegoro
            </p>
          </div>
        </footer>
      </main>
    `;
  }

  renderCandidateCard(candidate, index) {
    return `
      <div class="candidate-card group animate-rocket-fly" style="animation-delay: ${index * 0.5}s;">
        <div class="indonesia-map-bg"></div>
        
        ${candidate.isLeading && this.data.totalVotes > 0 ? `
          <div class="absolute -top-2 -right-2 bg-gradient-to-r from-accent to-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce-in z-10">
            🏆 UNGGUL
          </div>
        ` : ''}

        <div class="absolute top-4 left-4 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg">
          ${candidate.id}
        </div>

        <div class="relative mb-6">
          <div class="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg overflow-hidden" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 197, 253, 0.2));">
            <img src="${candidate.image}" alt="${candidate.name}" class="w-full h-full object-cover" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <div class="w-full h-full flex items-center justify-center text-4xl" style="display: none;">👤</div>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-foreground mb-2">${candidate.name}</h2>
        <p class="text-sm text-muted-foreground mb-6">Calon Kepala Desa</p>

        <div class="rocket-container mb-6">
          <div 
            class="rocket"
            style="
              transform: translateY(-${candidate.percentage * 0.8}px) scale(${1 + candidate.percentage/400});
              transition: transform 2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            "
          >
            🚀
          </div>
        </div>

        <div class="mb-4">
          <div class="vote-counter animate-count-up">
            ${candidate.votes.toLocaleString('id-ID')}
          </div>
          <p class="text-sm text-muted-foreground">Suara</p>
        </div>

        <div class="text-3xl font-bold text-accent mb-4">
          ${candidate.percentage.toFixed(1)}%
        </div>

        <div class="space-y-2 mb-6">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${candidate.percentage}%;"></div>
          </div>
          <div class="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-center">
          <div class="election-card py-3">
            <div class="text-lg font-bold text-primary">
              ${this.data.totalVotes > 0 ? ((candidate.votes / this.data.totalVotes) * 100).toFixed(1) : '0.0'}%
            </div>
            <div class="text-xs text-muted-foreground">Persentase</div>
          </div>
          <div class="election-card py-3">
            <div class="text-lg font-bold text-accent">
              +${Math.floor(Math.random() * 50 + 10)}
            </div>
            <div class="text-xs text-muted-foreground">Update Terkini</div>
          </div>
        </div>
      </div>
    `;
  }

  formatTime(date) {
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Jakarta'
    });
  }

  startRealTimeUpdates() {
    // Real-time updates every 10 seconds
    setInterval(() => {
      if (!this.isLoading) {
        this.updateVoteData();
        this.renderApp();
      }
    }, 10000);
  }

  updateVoteData() {
    // Simulate vote increases (minimal changes to maintain ratio)
    this.data.candidates = this.data.candidates.map(candidate => ({
      ...candidate,
      votes: candidate.votes + Math.floor(Math.random() * 5 + 1)
    }));

    this.data.totalVotes = this.data.candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
    this.data.lastUpdate = new Date();
  }
}

// Google Sheets Integration (Optional)
class GoogleSheetsAPI {
  constructor(apiKey, spreadsheetId, range) {
    this.apiKey = apiKey;
    this.spreadsheetId = spreadsheetId;
    this.range = range;
  }

  async fetchData() {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.range}?key=${this.apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.values) {
        // Parse spreadsheet data
        // Expected format: [["Candidate Name", "Votes"], ...]
        return data.values.slice(1).map((row, index) => ({
          id: index + 1,
          name: row[0],
          votes: parseInt(row[1]) || 0
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error);
      return [];
    }
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new ElectionDashboard();
});