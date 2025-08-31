"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import * as XLSX from "xlsx"
import { ButtonDark } from "../components/Button"
import { useRouter } from "next/navigation"
import { DoorOpen, LogOut } from "lucide-react"
import Link from "next/link"

// Constants
const ITEMS_PER_PAGE_OPTIONS = [5, 10, 25, 50]
const DEFAULT_ITEMS_PER_PAGE = 10
const DEFAULT_SORT_FIELD = "createdAt"
const DEFAULT_SORT_DIRECTION = "desc"

// Table headers configuration
const TABLE_HEADERS = [
    { key: "createdAt", label: "Date" },
    { key: "fullName", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "company", label: "Company" },
    { key: "website", label: "Website" },
    { key: "country", label: "Country" },
    { key: "productCategory", label: "Category" },
    { key: "role", label: "Role" },
    { key: "message", label: "Message" },
]

export default function AdminPage() {
    const [entries, setEntries] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    // Enhanced state for filtering, sorting, pagination, and search
    const [searchTerm, setSearchTerm] = useState("")
    const [sortField, setSortField] = useState(DEFAULT_SORT_FIELD)
    const [sortDirection, setSortDirection] = useState(DEFAULT_SORT_DIRECTION)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedCountry, setSelectedCountry] = useState("")
    const [dateRange, setDateRange] = useState({ start: "", end: "" })

    const router = useRouter() // <-- Initialize router


    const handleLogout = () => {
        // Clear the cookie by setting it to expire
        document.cookie = "admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict"
        console.log("🔴 Cookie cleared")
        // Redirect to login
        router.push("/login")
    }

    // Fetch entries with error handling and cleanup
    useEffect(() => {
        const abortController = new AbortController()

        const fetchEntries = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch("/api/contact", {
                    signal: abortController.signal
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()

                // Validate data structure
                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format received")
                }

                setEntries(data)
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Failed to fetch entries:', err)
                    setError(err.message || 'Failed to load submissions')
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false)
                }
            }
        }

        fetchEntries()

        return () => {
            abortController.abort()
        }
    }, [])

    // Memoized unique values for filters
    const { uniqueCategories, uniqueCountries } = useMemo(() => {
        const categories = [...new Set(entries.map((entry) => entry.productCategory).filter(Boolean))]
        const countries = [...new Set(entries.map((entry) => entry.country).filter(Boolean))]

        return {
            uniqueCategories: categories.sort(),
            uniqueCountries: countries.sort()
        }
    }, [entries])

    // Optimized filtering and sorting with better date handling
    const filteredAndSortedEntries = useMemo(() => {
        if (!Array.isArray(entries)) return []

        const filtered = entries.filter((entry) => {
            // Search filter - case insensitive, handles null/undefined values
            const matchesSearch = !searchTerm.trim() ||
                Object.values(entry).some((value) =>
                    value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )

            // Category filter
            const matchesCategory = !selectedCategory || entry.productCategory === selectedCategory

            // Country filter
            const matchesCountry = !selectedCountry || entry.country === selectedCountry

            // Date range filter with better date parsing
            const matchesDateRange = !dateRange.start || !dateRange.end || (() => {
                if (!entry.createdAt) return false

                const entryDate = new Date(entry.createdAt)
                const startDate = new Date(dateRange.start)
                const endDate = new Date(dateRange.end)

                // Set end date to end of day for inclusive comparison
                endDate.setHours(23, 59, 59, 999)

                return entryDate >= startDate && entryDate <= endDate
            })()

            return matchesSearch && matchesCategory && matchesCountry && matchesDateRange
        })

        // Sort entries with improved sorting logic
        return filtered.sort((a, b) => {
            let aVal = a[sortField]
            let bVal = b[sortField]

            // Handle null/undefined values
            if (aVal == null && bVal == null) return 0
            if (aVal == null) return 1
            if (bVal == null) return -1

            // Special handling for dates
            if (sortField === "createdAt") {
                aVal = new Date(aVal)
                bVal = new Date(bVal)

                // Handle invalid dates
                if (isNaN(aVal.getTime()) && isNaN(bVal.getTime())) return 0
                if (isNaN(aVal.getTime())) return 1
                if (isNaN(bVal.getTime())) return -1
            } else {
                // Convert to string for consistent comparison
                aVal = aVal.toString().toLowerCase()
                bVal = bVal.toString().toLowerCase()
            }

            if (aVal < bVal) return sortDirection === "asc" ? -1 : 1
            if (aVal > bVal) return sortDirection === "asc" ? 1 : -1
            return 0
        })
    }, [entries, searchTerm, sortField, sortDirection, selectedCategory, selectedCountry, dateRange])

    // Pagination calculations
    const totalPages = Math.ceil(filteredAndSortedEntries.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedEntries = filteredAndSortedEntries.slice(startIndex, startIndex + itemsPerPage)

    // Optimized sort handler
    const handleSort = useCallback((field) => {
        if (sortField === field) {
            setSortDirection(prev => prev === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }, [sortField])

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, selectedCategory, selectedCountry, dateRange, itemsPerPage])

    // Clear filters handler
    const clearFilters = useCallback(() => {
        setSearchTerm("")
        setSelectedCategory("")
        setSelectedCountry("")
        setDateRange({ start: "", end: "" })
        setCurrentPage(1)
    }, [])

    // Optimized CSV export with better error handling
    const exportCSV = useCallback(() => {
        if (filteredAndSortedEntries.length === 0) return

        try {
            const headers = Object.keys(filteredAndSortedEntries[0])
            const csvRows = [
                headers.join(","),
                ...filteredAndSortedEntries.map((row) =>
                    headers.map((field) => {
                        const value = row[field] ?? ""
                        // Escape quotes and wrap in quotes if contains comma, quote, or newline
                        const escaped = value.toString().replace(/"/g, '""')
                        return /[",\n\r]/.test(escaped) ? `"${escaped}"` : escaped
                    }).join(",")
                ),
            ]
            const csvString = csvRows.join("\n")

            const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
            const url = window.URL.createObjectURL(blob)

            const a = document.createElement("a")
            a.href = url
            a.download = `submissions_${new Date().toISOString().split('T')[0]}.csv`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Failed to export CSV:', error)
            alert('Failed to export CSV. Please try again.')
        }
    }, [filteredAndSortedEntries])

    // Optimized Excel export with better error handling
    const exportExcel = useCallback(() => {
        if (filteredAndSortedEntries.length === 0) return

        try {
            const worksheet = XLSX.utils.json_to_sheet(filteredAndSortedEntries)
            const workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions")

            XLSX.writeFile(workbook, `submissions_${new Date().toISOString().split('T')[0]}.xlsx`)
        } catch (error) {
            console.error('Failed to export Excel:', error)
            alert('Failed to export Excel file. Please try again.')
        }
    }, [filteredAndSortedEntries])

    // Pagination handlers
    const handlePageChange = useCallback((page) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    }, [totalPages])

    const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
        setItemsPerPage(Number(newItemsPerPage))
        setCurrentPage(1)
    }, [])

    // Generate page numbers for pagination
    const getPageNumbers = useMemo(() => {
        const maxVisiblePages = 5
        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        if (currentPage <= 3) {
            return Array.from({ length: maxVisiblePages }, (_, i) => i + 1)
        }

        if (currentPage >= totalPages - 2) {
            return Array.from({ length: maxVisiblePages }, (_, i) => totalPages - maxVisiblePages + i + 1)
        }

        return Array.from({ length: maxVisiblePages }, (_, i) => currentPage - 2 + i)
    }, [currentPage, totalPages])

    // Format date helper
    const formatDate = useCallback((dateString) => {
        if (!dateString) return { date: "-", time: "" }

        try {
            const date = new Date(dateString)
            if (isNaN(date.getTime())) return { date: "-", time: "" }

            return {
                date: date.toLocaleDateString(),
                time: date.toLocaleTimeString()
            }
        } catch {
            return { date: "-", time: "" }
        }
    }, [])

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg font-light text-gray-600">Loading submissions...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-light text-gray-900 mb-2">Error Loading Data</h3>
                    <p className="text-gray-600 font-light mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="section mx-auto px-6 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 tracking-tight mb-2">Form Submissions</h1>
                            <p className="text-lg text-gray-600 font-light">
                                {filteredAndSortedEntries.length} of {entries.length}{" "}
                                {entries.length === 1 ? "submission" : "submissions"}
                                {filteredAndSortedEntries.length !== entries.length && " (filtered)"}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <ButtonDark
                                className="flex justify-center gap-2 items-center"
                                onClick={exportCSV}
                                disabled={filteredAndSortedEntries.length === 0}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                Export CSV
                            </ButtonDark>
                            <button
                                onClick={exportExcel}
                                disabled={filteredAndSortedEntries.length === 0}
                                className="px-6 py-3 border border-secondary text-secondary font-medium rounded-lg hover:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 17v-2m3 2v-4m3 4v-6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                Export Excel
                            </button>
                            <Link href={'/'}>
                                <span className="flex gap-2 justify-center bg-red-50 items-center rounded-lg border-1 border-red-500 p-2 cursor-pointer" >
                                    <LogOut className=" text-red-500  h-5 w-5" />
                                    Logout
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section mx-auto px-6 py-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                            <div className="relative">
                                <svg
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search all fields..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                            >
                                <option value="">All Categories</option>
                                {uniqueCategories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Country Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                            <select
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                            >
                                <option value="">All Countries</option>
                                {uniqueCountries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Date Range and Clear Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                        <div className="flex gap-4 flex-1">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                                <input
                                    type="date"
                                    value={dateRange.start}
                                    onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
                                    className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                                <input
                                    type="date"
                                    value={dateRange.end}
                                    onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
                                    className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        <button
                            onClick={clearFilters}
                            className="px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Clear Filters
                        </button>
                    </div>
                </div>

                {entries.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-light text-gray-900 mb-2">No submissions yet</h3>
                        <p className="text-gray-600 font-light">Form submissions will appear here once received.</p>
                    </div>
                ) : filteredAndSortedEntries.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-light text-gray-900 mb-2">No results found</h3>
                        <p className="text-gray-600 font-light">Try adjusting your search or filter criteria.</p>
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {TABLE_HEADERS.map((header) => (
                                                <th
                                                    key={header.key}
                                                    className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                                                    onClick={() => handleSort(header.key)}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {header.label}
                                                        <div className="flex flex-col">
                                                            <svg
                                                                className={`w-3 h-3 ${sortField === header.key && sortDirection === "asc" ? "text-gray-900" : "text-gray-400"}`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            <svg
                                                                className={`w-3 h-3 -mt-1 ${sortField === header.key && sortDirection === "desc" ? "text-gray-900" : "text-gray-400"}`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {paginatedEntries.map((entry) => {
                                            const { date, time } = formatDate(entry.createdAt)
                                            return (
                                                <tr key={entry._id || entry.id || Math.random()} className="hover:bg-gray-50 transition-colors duration-150">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                        {date}
                                                        {time && (
                                                            <div className="text-xs text-gray-500 mt-1">
                                                                {time}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {entry.fullName || "-"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{entry.email || "-"}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{entry.phone || "-"}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{entry.company || "-"}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {entry.website ? (
                                                            <a
                                                                href={entry.website.startsWith('http') ? entry.website : `https://${entry.website}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                                            >
                                                                {entry.website.length > 30 ? entry.website.substring(0, 30) + "..." : entry.website}
                                                            </a>
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{entry.country || "-"}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                            {entry.productCategory || "-"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{entry.role || "-"}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                                                        <div className="truncate" title={entry.message}>
                                                            {entry.message || "-"}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4 mt-6">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-700">
                                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedEntries.length)}{" "}
                                        of {filteredAndSortedEntries.length} results
                                    </span>
                                    <select
                                        value={itemsPerPage}
                                        onChange={(e) => handleItemsPerPageChange(e.target.value)}
                                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                    >
                                        {ITEMS_PER_PAGE_OPTIONS.map(option => (
                                            <option key={option} value={option}>{option} per page</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                    >
                                        Previous
                                    </button>

                                    <div className="flex gap-1">
                                        {getPageNumbers.map((pageNum) => (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${currentPage === pageNum
                                                    ? "bg-gray-900 text-white"
                                                    : "text-gray-700 hover:bg-gray-100"
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}