import React, { useState } from 'react';
import HeaderBar from '../../components/ui/HeaderBar';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import ReportFilters from './components/ReportFilters';
import KPICards from './components/KPICards';
import ChartsSection from './components/ChartsSection';
import DataTable from './components/DataTable';

const HistorialYReportes = () => {
  const [filters, setFilters] = useState({
    startDate: '01/08/2025',
    endDate: '11/08/2025',
    reportType: 'ocupacion-diaria',
    roomType: 'todos',
    floor: 'todos',
    guestCategory: 'todos'
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleExport = (format, exportFilters) => {
    // Mock export functionality
    console.log(`Exportando reporte en formato ${format} con filtros:`, exportFilters);
    
    // Simulate export process
    const exportData = {
      format,
      filters: exportFilters,
      timestamp: new Date()?.toISOString(),
      filename: `reporte_${exportFilters?.reportType}_${exportFilters?.startDate?.replace(/\//g, '')}_${exportFilters?.endDate?.replace(/\//g, '')}.${format}`
    };
    
    // In a real application, this would trigger a download
    alert(`Reporte exportado: ${exportData?.filename}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderBar />
      <SidebarNavigation />
      <main className="md:ml-60 pt-16">
        <NavigationBreadcrumb />
        
        <div className="p-8">
          {/* Report Configuration */}
          <ReportFilters 
            onFiltersChange={handleFiltersChange}
            onExport={handleExport}
          />

          {/* Key Performance Indicators */}
          <KPICards reportType={filters?.reportType} />

          {/* Charts and Visualizations */}
          <ChartsSection reportType={filters?.reportType} />

          {/* Detailed Data Table */}
          <DataTable reportType={filters?.reportType} />
        </div>
      </main>
      {/* Mobile spacing for bottom navigation */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
};

export default HistorialYReportes;